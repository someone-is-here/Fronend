# About project Streaming Service
Streaming Service is a web-application the main purpose of which is to create a platform for music lovers. Here you can enjoy best albums & tracks. Create playlist according to your own preferencies. In addition, upload your own album and tracks.

# Deploy Link
https://someone-is-here.github.io/Frontend/streaming/index.html

# MockUps
## For main page:
![image](https://github.com/someone-is-here/Frontend/assets/48770804/25d842a9-6432-497e-a2e6-de48891c6eac)

## For artists:
![image](https://github.com/someone-is-here/Frontend/assets/48770804/96e0a3d8-61c4-4b79-9d93-eea66d0f1649)

## For albums:
![image](https://github.com/someone-is-here/Frontend/assets/48770804/be1e07b7-4ac1-4e97-8db8-643a950eca2c)

## For tracks:
![image](https://github.com/someone-is-here/Frontend/assets/48770804/1655fff0-57a5-4b7b-abf7-6f5b3883aca1)

# Models Description
- User Model: (login, email address, role, password, subscription/name, website, tour dates, photo, country).

- Album Model: (Title, Year, Cover, likes).

- Track Model: (Title, Cover, Track, Album, likes, streaming).

- Playlist Model: (Title, Cover, Tracks, likes).

- Instrument/Label/Genre Model: (Name).

# Functionality

User: 
1. Can listen to albums
2. Can listen tracks
3. Can like and stream tracks
4. Can create playlists 
6. Can get artist info

Artist:
1. Can create album
2. Can add tracks to albums (can't add track without album)
4. Can add genre
5. Can add instrument
6. Can add label
7. Can create playlist

Admin has access to everything via firebase.

