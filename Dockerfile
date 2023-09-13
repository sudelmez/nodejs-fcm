# Node.js resmi imajını kullanıyoruz
FROM node:14

# Uygulamanın bulunacağı dizini belirtiyoruz
WORKDIR /usr/src/app

# Uygulamanızın package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install

# Uygulamanızın geri kalan dosyalarını kopyalayın
COPY . .

# Uygulamanızın çalışacağı portu belirtin
EXPOSE 3000

# Uygulamanızın nasıl başlatılacağını belirtin
CMD [ "node", "index.js" ]
