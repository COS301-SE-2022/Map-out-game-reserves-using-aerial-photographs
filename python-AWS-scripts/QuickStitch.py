#!/usr/bin/env python

'''
Stitching sample
================

Show how to use Stitcher API from python in a simple way to stitch panoramas
or scans.
'''

# Python 2/3 compatibility
#from __future__ import print_function
import cv2
import numpy as np
from imutils import paths
import argparse
import time
import os

modes = (cv2.Stitcher_PANORAMA, cv2.Stitcher_SCANS)

parser = argparse.ArgumentParser(prog='stitching.py', description='Stitching sample.')
parser.add_argument('--mode',
    type = int, choices = modes, default = cv2.Stitcher_SCANS,
    help = 'Determines configuration of stitcher. The default is `PANORAMA` (%d), '
        'mode suitable for creating photo panoramas. Option `SCANS` (%d) is suitable '
        'for stitching materials under affine transformation, such as scans.' % modes)
parser.add_argument('--output', default = 'QuickStitchResult{TimeStamp}.png',
    help = 'Resulting image. The default is `QuickStitchResult{TimeStamp}.png`.')
parser.add_argument('--input', default='SmallFrames')

__doc__ += '\n' + parser.format_help()



# def resizeImage(img):
#     base_width = 360
#     image = img
#     width_percent = (base_width / float(image.size[0]))
#     hsize = int((float(image.size[1]) * float(width_percent)))
#     return image.resize((base_width, hsize), PIL.Image.ANTIALIAS)

def main():
    for directory, subdirectories,filenames in os.walk('SmallFrames'):
        #Discount the top level directory, we're only interested in subdirectories
        if directory == 'SmallFrames':
            continue
        else:
            print(directory)
            frame_interval = 2

            args = parser.parse_args()
            inputPath = sorted(list(paths.list_images(directory)))

            stitcher = cv2.Stitcher_create(args.mode) #OpenCV 4

            # read input images
            print('[INFO]: reading input images...')
            tic = time.perf_counter()

            #Try to make an array of multiple imgs = [] (according to num of threads)
            imgs1 = []

            """     for imagePath in inputPath:
                if count % frame_interval == 0:
                    image = cv2.imread(imagePath)
                    imgs1.append(image)
                else:
                    image = cv2.imread(imagePath)
                    imgs2.append(image)
                count += 1
            toc = time.perf_counter()
            print(f"Images Loaded in {toc - tic:0.4f} seconds") """

            # try stitch
            print("[INFO]: stitching images...")
            tic = time.perf_counter()
            count = 0
            for imagePath in inputPath:
                if count % frame_interval == 0:
                    #It appears that the stitcher needs at least 10 images to stitch at a time, ensure that there are at least 10 in the list
                    if count < (frame_interval*10):
                        image = cv2.imread(imagePath)
                        imgs1.append(image)
                    else:
                        (status, stitched) = stitcher.stitch(imgs1)
                        if status != cv2.Stitcher_OK:
                            print("Can't stitch images, error code = %d" % status)
                            continue
                        else:
                            imgs1.clear()
                            imgs1.append(stitched)
                            count = -1
                count += 1
                os.remove(imagePath)

            #if count != 0:
            #    (status, stitched) = stitcher.stitch(imgs1)
            #    if status != cv2.Stitcher_OK:
            #        print("Can't stitch images, error code = %d" % status)
            #        continue
            #    else:
            #        imgs1.clear()
            #        imgs1.append(stitched)
            toc = time.perf_counter()
            print(f"Images Stitched in {toc - tic:0.4f} seconds")

            #Provide  timestamp so that each resulting filename is somewhat unique (doesn't overwrite previous batch)
            timestr = time.strftime("%Y%m%d-%H%M%S")
            imageName = './PartialStitches/QuickStitchResult'+ timestr + '.png'

            # write output to disk  -   imgs[0] contains final stitched result
            if imgs1[0] is not None:
                cv2.imwrite(imageName, imgs1[0])
                print("stitching completed successfully. %s saved!" % args.output)
    print('Done')


if __name__ == '__main__':
    print(__doc__)
    main()
    cv2.destroyAllWindows()