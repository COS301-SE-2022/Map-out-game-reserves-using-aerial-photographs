from concurrent.futures import thread
import cv2
import numpy as np
import PIL
from PIL import Image
import requests
from io import BytesIO
from PIL import ImageFilter
from PIL import ImageEnhance
from IPython.display import display
import os

path = r'D:\Documents\University of Pretoria\COS301\Capstone Project\ImageStitching\OpenCV\PartialStitches'
for root, dirs, files in os.walk(path):
    for file in files:
        print(file)
        img = cv2.imread(file)

        #If sequence of 10 pixels all consist of black
        #Start by going through each column downwards
        print(img.shape)
        print(img.shape[0])

        chop_y = img.shape[0]
        chop_x = img.shape[1]


        #Starting from the top
        chop_y = img.shape[0]
        for col in range(0,img.shape[0]):
            dataInCol = False
            for row in range(0,img.shape[1]):
                pixel = img.item(row,col)
                if (pixel[0] != 0 and pixel[1] != 0 and pixel[2] != 0):
                    dataInCol = True
            if dataInCol:
                chop_y = col
            else:
                break
            
        #Starting from the left
        chop_x = img.shape[1]
        for row in range(0,img.shape[1]):
            dataInRow = False
            for col in range(0,img.shape[0]):
                pixel = img.item(row,col)
                if (pixel[0] != 0 and pixel[1] != 0 and pixel[2] != 0):
                    dataInRow = True
            if dataInRow:
                chop_x = row
            else:
                break
            
        img = img[0:chop_y, 0:chop_x]

        cv2.imwrite("CroppedImg.png",img)