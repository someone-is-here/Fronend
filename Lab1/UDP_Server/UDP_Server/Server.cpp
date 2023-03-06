#include <iostream>
#include <ws2tcpip.h>
#include <thread>
#include <string>
#include <map>
#include <vector>

#pragma comment(lib, "ws2_32.lib")

#define PORT     8080
#define MAXLINE 1024

using namespace std;

int ID = 0;
string current_user;

map<string, vector<string>> messages;


int writeMessage(SOCKET* in, sockaddr_in* client, int* clientLength) {
	while (true) {
		string messageToClient;
		getline(cin, messageToClient);

		if (messageToClient[0] == 0) {
			break;
		}

		int sendOk = sendto(*in, messageToClient.c_str(), messageToClient.size() + 1, 0, (sockaddr*)&(*client), *clientLength);

		if (sendOk == SOCKET_ERROR) {
			cout << "Get socket error: " << WSAGetLastError() << endl;
			return -3;
		} else {
			messages[current_user].push_back("SERVER: " + messageToClient);
		}

	}
	return 0;
}

int writePreviousMessages(SOCKET* in, sockaddr_in* client, int* clientLength, string messageToClient) {

	int sendOk = sendto(*in, messageToClient.c_str(), messageToClient.size() + 1, 0, (sockaddr*)&(*client), *clientLength);

	if (sendOk == SOCKET_ERROR) {
		cout << "Get socket error: " << WSAGetLastError() << endl;
		return -3;
	}

	return 0;
}

int main() {
	//startup winsock
	WSADATA data;
	WORD version = MAKEWORD(2, 2);

	int ws0k = WSAStartup(version, &data);

	if (ws0k != 0) {
		cout << "Can't start Winsock! " << ws0k << endl;
		return -1;
	}

	//create socket
	//bind socket to ip address and port
	//AF_INET: IPv4
	//SOCK_DGRAM for UDP
	// 0: default protocol for the address family
	SOCKET in = socket(AF_INET, SOCK_DGRAM, 0);
	sockaddr_in serverHint;

	serverHint.sin_addr.S_un.S_addr = ADDR_ANY;
	//any ip
	serverHint.sin_family = AF_INET;
	//port 54000 htons:host to network short
	serverHint.sin_port = htons(PORT);

	//bind socket to the post and ip combination
	//int bind(int sockfd, const struct sockaddr* addr, socklen_t addrlen)
	//Assigns address to the unbound socket.
	//sockfd – File descriptor of a socket to be bonded
	//addr – Structure in which the address to be bound to is specified
	//addrlen – Size of addr structure
	if (bind(in, (sockaddr*)&serverHint, sizeof(serverHint))) {
		cout << "Can't bind socket! " << WSAGetLastError() << endl;
		return -2;
	}

	//clinet info
	sockaddr_in client;
	int clientLength = sizeof(client);

	ZeroMemory(&client, clientLength);
	//buffer for message
	char buff[1024];
	
	thread my_thread(writeMessage, &in, &client, &clientLength);

	while (true) {
		ZeroMemory(buff, MAXLINE);
		//ssize_t recvfrom(int sockfd, void* buf, size_t len, int flags,
		//	struct sockaddr* src_addr, socklen_t * addrlen)
		//	Receive a message from the socket.
		//	sockfd – File descriptor of the socket
		//	buf – Application buffer is a pointer which receives the data
		//	len – Size of buf application buffer
		//	flags – Bitwise OR of flags to modify socket behavior
		//	src_addr – Structure containing source address is returned
		//	addrlen – Variable in which the size of src_addr structure is returned
		int bytesIn = recvfrom(in, buff, MAXLINE, 0, (sockaddr*)&client, &clientLength);
		if (bytesIn == SOCKET_ERROR) {
			cout << "Error receiving from client! " << WSAGetLastError() << endl;
			continue;
		}

		char clientIp[256];
		ZeroMemory(clientIp, 256);
		//number to point it to the string
		inet_ntop(AF_INET, &client.sin_addr, clientIp, 256);
		cout << &client << " " << clientLength << " " << &client.sin_addr << endl;
		cout << "Message recieved from " << clientIp << ": " << buff << endl;

		if (((string)buff).substr(0, 4) == "NAME") {

			current_user = ((string)buff).substr(6);
			cout << "Name: " << current_user << endl;

			if (messages.find(current_user) == messages.end()) {
				messages.emplace(current_user, vector<string>());
				cout << current_user << endl;
			} else {
				writePreviousMessages(&in, &client, &clientLength, "PREVIOUS MESSAGES: ");

				for (string message : messages[current_user]) {
					writePreviousMessages(&in, &client, &clientLength, message);
				}

			}
			
		} else {
			messages[current_user].push_back("CLIENT: " + (string)buff);
		}

	}
	my_thread.detach();
	//close socket 
	closesocket(in);

	//shutdown winsock
	WSACleanup();

	return 0;
}