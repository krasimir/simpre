mkdir ./simpre
cp -r ./public/assets ./simpre
cp -r ./public/slides ./simpre
cp -r ./public/index.html ./simpre
zip -r ./public/simpre.zip ./simpre
rm -r ./simpre

vercel --prod