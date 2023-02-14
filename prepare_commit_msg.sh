#!/bin/sh
#
# git prepare-commit-msg hook for automatically prepending an issue key
# from the start of the current branch name to commit messages.

# check if commit is fixup commit, already prefixed with issue key, merge commit or a commit amend
MSG=$(<$1)
if [[ $MSG =~ ^fixup!.* ]] || [[ $MSG =~ ^[A-Z]{2,}-[0-9]+ ]] || [ $2 = "merge" ] || [ $2 = "commit" ]; then
    exit
fi
ISSUE_KEY=`git branch | grep -o "\* \(.*/\)*[A-Z]\{2,\}-[0-9]\+" | grep -o "[A-Z]\{2,\}-[0-9]\+"`
if [ $? -ne 0 ]; then
    # no issue key in branch, use the default message
    exit
fi
# issue key matched from branch prefix, prepend to commit message
TEMP=`mktemp /tmp/commitmsg-XXXXX`
(echo "$ISSUE_KEY $(cat  $1)") > $TEMP
cat $TEMP > $1
