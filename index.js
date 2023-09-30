const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// const corsOptions = {
//     origin: 'http://example.com', // İzin vermek istediğiniz kök etki alanı
//     methods: 'GET,POST', // İzin vermek istediğiniz HTTP yöntemleri
// };

// app.use(cors(corsOptions));
// Bu şekilde sadece belirli bir kök etki alanından gelen GET ve POST isteklerine izin verilir.
// Headers ve Diğer Ayarlar: CORS ayarlarına ek olarak, bazen belirli başlıkların veya diğer ayarların kontrolünü de ele almanız gerekebilir. Bu ayarlar, sunucunuzun isteklere nasıl yanıt vereceğini belirler. Express ile bu ayarları middleware ve yönlendirme işlevleri aracılığıyla yapılandırabilirsiniz.

// Body-parser ayarları
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Admin SDK için indirdiğiniz anahtar dosyasını kullanarak başlatma
const serviceAccount = require('./ticketedu.json');  // indirdiğiniz anahtar dosyasının yolunu belirtin

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/send-notification', (req, res) => {
    const topic = 'all2';

    const message = {
        data: {
            title: '1 Yeni TickEdu Bildirimi!',
            body: 'Yeni etkinliklere hemen gözat!'
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            res.send(response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            res.status(500).send(error);
        });

});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
