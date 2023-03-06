#include <iostream>
#include <WS2tcpip.h>
#include <string>
#include <thread>

#pragma comment (lib, "ws2_32.lib")

#define PORT     8080
#define MAXLINE 1024

using namespace std;

int writeMessage(SOCKET* out, sockaddr_in* server) {
	while (true) {
		cout << "Enter messaage(or enter to exit): " << endl;

		string messageToServer;
		getline(cin, messageToServer);

		if (messageToServer[0] == 0) {
			exit(0);
		}

		int sendOk = sendto((*out), messageToServer.c_str(), messageToServer.size() + 1, 0, (sockaddr*)(&(*server)), sizeof(*server));

		if (sendOk == SOCKET_ERROR) {
			cout << "Get socket error: " << WSAGetLastError() << endl;
			return -3;
		}

	}
	return 0;
}

int main(int argc, char* argv[]) {
	//startup winsock
	WSADATA data;
	WORD version = MAKEWORD(2, 2);
	int ws0k = WSAStartup(version, &data);

	if (ws0k != 0) {
		cout << "Can't start winsock!" << endl;
		return -1;
	}

	//server structure
	sockaddr_in server;
	server.sin_family = AF_INET;
	server.sin_port = htons(PORT);
	server.sin_addr.S_un.S_addr = ADDR_ANY;
	inet_pton(AF_INET, "127.0.0.1", &server.sin_addr);

	//create socket(int domain, int type, int protocol)-> returns descriptor
	SOCKET out = socket(AF_INET, SOCK_DGRAM, 0);
	if (out != INVALID_SOCKET) {
		cout << "Enter name: " << endl;
		string name;
		getline(cin, name);

		int sendOk = sendto(out, ("NAME: " + name).c_str(), ("NAME: " + name).size() + 1, 0, (sockaddr*)(&(server)), sizeof(server));

		if (sendOk == SOCKET_ERROR) {
			cout << "Get socket error: " << WSAGetLastError() << endl;
			return -3;
		}
	}
	//ssize_t sendto(int sockfd, const void* buf, size_t len, int flags,
	//const struct sockaddr* dest_addr, socklen_t addrlen)
	//Send a message on the socket
	//buf – Application buffer containing the data to be sent
	//len – Size of buf application buffer
	//flags – Bitwise OR of flags to modify socket behavior
	//dest_addr – Structure containing the address of the destination
	//addrlen – Size of dest_addr structure

	thread write_thread(writeMessage, &out, &server);

	char buff[1024];
	int serverLength = sizeof(server);
	ZeroMemory(buff, MAXLINE);

	while (true) {
		ZeroMemory(buff, MAXLINE);
		int bytesIn = recvfrom(out, buff, MAXLINE, 0, (sockaddr*)&server, &serverLength);

		if (bytesIn == SOCKET_ERROR) {
			continue;
		}

		cout << "Message recieved from server: " << buff << endl;
	}

	write_thread.detach();

	//close socket
	closesocket(out);

	//close Winsock
	WSACleanup();

	return 0;
}