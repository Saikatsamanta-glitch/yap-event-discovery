EXCLUDE=$(basename -- $0)
FILES="$(grep -nr -e '<<<<<<< HEAD' --exclude=$EXCLUDE)"
if [ -z "$FILES" ]
then
      echo "[pass]"
else
      printf "[fail]\n conflict present in below files: \n$FILES\n"
      exit 1;
fi

