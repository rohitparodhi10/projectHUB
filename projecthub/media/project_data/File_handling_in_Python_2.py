#!/usr/bin/env python
# coding: utf-8

# In[1]:


"""
Python can be used to perform operation on a file. 

In python we store the data in files.(e.g code gets dtored in the file format)

File will be stored at SSD /HDD

what is file handling ?

File is a named location on a disk to store related information. 
It is used to permanantly store the data in memory (i.e. hard disk)

There are 3 operations in File handling :

1.Open a file
2. Read or write a file 
3. Close a file 

Open a File 

Python has a built-in function open() to open a file.
This function returns a file object , also called a handle as it is 
used to read or modify the file. 

syntax :

f = open("hello.txt")   #open file in current directory 
f = open("C:/desktop/hello.txt")  #specifying full path 


File opening mode

mode                     Description
'r'               open a file in read mode

'w'               open a file in write mode 

'a'               open a file in append mode 

'r+'              open a file in reading and writing mode 

'w+'              open a file in write mode but also allows to read from file 

'a+'              open a file in append mode but also open for reading 




E.g. = f = open("hello.txt",'w')
       f = open("hello.txt", mode = 'w')
       
       
Close a file :

when we are done with operations to the file, we need to properly close the file.

closing a file is done using python's close() method.


# close a file using with 

we don't need to explicitily call the close() method. It is done internally.

syntax : 

with open("hello.txt", mode = 'w') as f:


# Read and write file :

if we want to read file in python , we must to open it in read 'r' mode.

we can read the file completely at once  or we can read it in parts as well.

# methods to read the file :

1. read() - # return one big string
2. readline() - # return one line at a time 
3. readlines()- # return a list of lines.


"""


# In[ ]:




