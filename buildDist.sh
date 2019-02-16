SRC=src
DIST=dist
STYLESHEETS_SRC="$SRC/stylesheets"
STYLESHEETS_DIST="$DIST/stylesheets"

rm -rf $DIST

# rollup -c
mkdir -p "$DIST/cjs" "$DIST/esm"
cp "$SRC/distMain.js" "$DIST/cjs/index.js"
cp "$SRC/distMain.js" "$DIST/esm/index.js"

cp -r $STYLESHEETS_SRC $STYLESHEETS_DIST
for f in `ls $STYLESHEETS_DIST`; do
  cleancss -o "$STYLESHEETS_DIST/${f%.css}.min.css" "$STYLESHEETS_SRC/$f"
done
