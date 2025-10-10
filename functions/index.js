// functions/index.js
const {onRequest} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2/options");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
setGlobalOptions({maxInstances: 10});

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (err) {
      console.error("Error counting books:", err);
      res.status(500).send("Error counting books");
    }
  });
});
