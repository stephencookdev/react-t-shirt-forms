rm -rf ./size-tester/dist

webpack --config ./size-tester/webpack.config.js

cd ./size-tester/dist

file_size() {
  stat -c %s "$1"
}

diff_kb() {
  echo "scale=2; ($1 - $2) / 1024" | bc
}

BASE_SIZE=$(file_size "nothing.js")
GZIP_BASE_SIZE=$(file_size "nothing.js.gz")

for x in *.js; do
  if [ "$x" = "nothing.js" ]; then
    continue
  fi

  size=$(file_size "$x")
  size_diff=$(diff_kb "$size" "$BASE_SIZE")

  gzip_size=$(file_size "$x.gz")
  gzip_size_diff=$(diff_kb "$gzip_size" "$GZIP_BASE_SIZE")

  file_name_clean=$(echo "${x%.js}" | sed "s/-/ /g")

  echo "- $file_name_clean ($size_diff KB / **$gzip_size_diff KB gzipped**)"
done
