# Notes
## What is this document?
This document will be available during exams, so is the best place to store important class info.
The file format, .md, is expected to be treated as a markdown document, a kind of plaintext document
in which special characters are used to provide basic text richness like headings, italics, etc.

## Basics of Markdown
Newlines are inserted by ending a line with '\\'.\
Headings are created with one or more hash symbols before the text - more hashes mean a smaller heading.\
bold is denoted by \*\* **bold text** \*\* or \_\_**bold text**\_\_, which will be inserted by cmd-b\
italics (cmd-i) are single asterisk or underscore: \__italic text_\_.\
To next bold and italics, use asterisks on the outside and underscores on the inside. Triple asterisk\
makes an entire passage bold italics: \*\*\* ***extremely intense text*** \*\*\*.\
This is a \<sub><sub>subscript</sub>\</sub> text. \<sup> works the same way for superscript.\
\
More details to come!

## Technology Stack: Amazon Web Services, EC2 and Route 53
Our stack will be 4 tiers: client (react/three pillars/html, css, javascript)\
server (caddy dealing with two services on server)\
another one (also server?)\
mongodb\
\
dev environment, production environment, user environment, and database environment\
\
I resolved to not get suicidal this period and have already failed. It is 3:08 and I hate this class.\
\
ssh command (from git bash): ssh -i "C:\Users\ryanj\Documents\Classwork\CS 260\260 Server key.pem" ubuntu@34.233.153.235\


## Technology, cont. : Caddy, HTTPS, TLS
Caddy recieves http request and interprets it to get the file we need, or pass the request on to the right service. Simplifies http parsing.\
Https does two things: it encrypts your messages and requires the server to prove it is, in fact, the server it claims to be. 
