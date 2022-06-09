import os
import shutil
import re

N = 50  # the number of files in seach subfolder folder

def nat_sort(s):
    '''
    provides a sort mechanism for strings that may or 
    may not lead with an integer
    '''
    for i, c in enumerate(s):
        if not c.isdigit():
            break
    if not i:
        return 0, s
    else:
        return int(s[:i]), s[i:]


def move_files(abs_dirname):
    """Move files into subdirectories."""

    files = [os.path.join(abs_dirname, f) for f in os.listdir(abs_dirname)]

    i = 0
    curr_subdir = None
    files.sort(key=lambda f: int(re.sub('\D', '', f)))

    for f in files:
        # create new subdir if necessary
        if i % N == 0:
            subdir_name = os.path.join(abs_dirname, '{0:03d}'.format(i // N + 1))
            os.mkdir(subdir_name)
            curr_subdir = subdir_name

        # move file to current dir
        f_base = os.path.basename(f)
        shutil.move(f, os.path.join(subdir_name, f_base))
        i += 1

move_files('./SmallFrames')