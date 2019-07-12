

# Git

Source: https://www.atlassian.com/git/tutorials/merging-vs-rebasing



### Merge and Rebase

Both of these commands integrate one branch into another branch. 



#### Merge

```
git checkout myBranch
git merge master

OR

git merge feature master	
```

Pros: non destructive

Cons: every merge will be its own commit. 

<img src="https://wac-cdn.atlassian.com/dam/jcr:e229fef6-2c2f-4a4f-b270-e1e1baa94055/02.svg?cdnVersion=457" width="500">



#### Rebase

```
git checkout feature
git rebase master

```

Pros: cleaner project history (linear history)

Cons: more dangerous, and lose context.



<img src="https://wac-cdn.atlassian.com/dam/jcr:5b153a22-38be-40d0-aec8-5f2fffc771e5/03.svg?cdnVersion=457" width="500">

Interactive rebasing:

```
git rebase -i
```

`fixup`: fixes a problem in the previous commit.

`squash`: merges commits. 



Golden rule of rebasing: never use it on public branches!! 

To push the rebased master branch to a remote repository, do `git push --force`

`git rebase -i HEAD~3` : only rewriting the last three commits





