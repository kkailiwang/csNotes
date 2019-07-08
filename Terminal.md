# Terminal

---



Resources: 

- CS1U ([LINK])
- leonards link



## Bash Shell 

https://youtu.be/aGEUON7k2m4




zsh : bash + some extra stuff, smarter. 
    
commands:
`mv [file] [optional additonal file/dir].... [destnation]`
	mv file .file - hides that file. 
`cp`- like mv, but copies 
`ls `- list all things
	ls -a - lists all files and directors (including hidden ones, ., and ..)
`cd`- change current directory
	cd folder1 - folder1 is subfolder.
    cd ~ - changes back to HOME
    cd / - goes to the very root of the computer. (obscure things)
    cd .. - goes to directory above current directory
	. - current folder. 
`man [command]`- opens manual page for that command. 
`mkdir` - makes a new directory within current folder(can have >= 1 argument)
	mkdir -p intermediate/subsubfolder - will make intermediate folders if necessary
chmod - changing file permissions. 
	su: switch user (out of superuser
	sudo [command] - if you're trying to do somethign that needs permission, this will prompt for password and then carry out command
jobs - shows prcoesses happening
	fg - goes back into the process
	bg - resumes job in the background.
cat - standard outputs a file 
wc - word count
wc -l [file] - line count
rm - removes a file
	rmdir - removes a directory (only if empty) PERMANENTLY
	rmdir -p dir/dir1/dir2 - removes intermediate dirs
	rmdir -r folder - removes the folder AND FILES (can bypass empty rule)
ctrl+c - to interrupt/exit
ctrl+z - out of current process and suspends the process (like minimizing)
ctrl+d - disconnect. 
uniq : outputs unique lines in file
only works for adjacent lines. if you want to remove any line copies, do "sort file.txt | uniq"


## INTRO TEXT EDITORS

https://www.youtube.com/watch?v=-6VEIBtrzgE&index=24&list=PLAn5BRyzQEf9VoK8gRKp8Z0LGME6fISaE

vim - hard to learn, universal, easy on pinky
    
    :q - quit
    :w - write (save) 
    ! - forces to do aforementioned command 
    i - insert mode
    vim tutor: for help 
    normal mode:
        h/l -> left and right
        j/k  up and down 
        b/f -> back and froward of the line
            
    emacs: lots of features. 
    nano- not as powerful as vim or emac
    
    vi- older version of vim


### Changing login shell

    chsh
        sh: main shell 
    chsh -s /bin/zsh
        change to zsh shell

### globbing: - ONLY WITH Z SHELL???? 

    echo * = ls
    echo *.txt = every file in directory with that suffix (* can represent any number of characters)
    echo resume.[ch] = returns resume.c and resume.h if they exist
    echo resume.? = ? can represent any character
    echo **/*  = shows every file in subdirectory or current directory. 
        ** means every subdirectory of current directory. 
        often used with grep
        grep - finds occurence of string of characters that matches specified pattern. 
        grep This **/* = finds "this" in any file of subdirectories.
    echo **/*.txt = returns text files of subdirectory
    echo **/*(^) = will negate all qualifiers after it
    echo **/*(*) = only returns executable files 
    echo **/*(.) = regular files
    echo **/*(/) 

head
    returns the first 10 lines
    head -n 3 -> returns the first 3
tail 


tr: 
    tr -d characters
        deletes characters
    tr -s [:space:] " "



## PIPING "|"
    using the output of one command as the input to another. 
    grep cat txt1 | grep bird
        -> redirects everything from txt1 that has cat in it, as an input to find everything that has bird in it
    compatible with anything that uses standard input/output 
    ls ~ | wc -l
        counts how many files are in home dir


    direct output to a file: ">"
        cat txt1 > foo
            funnels everything from txt1 into foo 
            if foo already exists, it will rewriute the file
        if text is too long, then do "less cat txt1" (goes page by page) 
        grep dog txt1 > temp
            funnels all of txt1 that has dog into temp
        if you put 0, 1, or 2 beforehand:
            0: writing to standard input
            1: writing to standard output
            2: rewriting to standard error. (redirect error to somewhere else)
            weghjoaiwejf 2> /dev/null  - outputs "command not found" to null file.
        
        ">>" will append to a file, not overwrite.


    input from file  "<"
        if a script requires raw input, you can do 
            echo "sam" > name
            ./conversation.py<name   

tee
    reads from standard input, writes to both standard output and a file.
    ex. cat txt1 | tee foo    
        outputs to both foo and txt1

diff
    finds the difference between two files. 
    diff file1 file2
        2c2 = line 2 is change from line 2
        5d4 = line 5 was deleted, now line 4
        7a7,12 = line 7 had an addition, between lines 7 and 12. 
    you can also do it with directories, if  they have the same named files.
    diff file3 file4 -b ->ignores changes in whitespaces, or white lines. 
    -y : does side by side comparison. 
    diff -y --width=50 file1 file2 : only uses 50 characters on each side. 
    
    
    



