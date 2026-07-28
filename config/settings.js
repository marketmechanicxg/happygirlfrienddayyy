/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║        GIRLFRIEND DAY — SEMUA PENGATURAN DI SINI             ║
 * ║  Kamu HANYA perlu edit file ini. Tidak perlu buka file lain. ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  Cara pakai:
 *  1. Baca setiap bagian (1–7)
 *  2. Ganti nilai yang ada tanda  ← GANTI INI
 *  3. Simpan file → refresh browser
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. PIN MASUK
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PIN 4–6 angka yang harus diketik tamu untuk membuka website.  */
const WEBSITE_PIN = "1111";              // ← GANTI PIN

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. NAMA PENERIMA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Nama yang muncul di halaman utama (hero).                      */
const RECIPIENT_NAME = "Nabila";           // ← GANTI NAMA (dikosongin biar gak ada nama yang muncul)


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. MUSIK
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILE MUSIK  → taruh di:  assets/music/song1.mp3
   FOTO COVER  → taruh di:  assets/music/song1.jpeg  (rasio 3:4)
   Lalu ganti judul dan nama artis di bawah ini.                  */
const MUSIC_TRACKS = [
  {
    title:  "WE FELL IN LOVE IN OCTOBER",             // ← GANTI JUDUL LAGU
    artist: "GIRL IN RED",                   // ← GANTI NAMA ARTIS
    src:    "assets/music/song1.mp3",    //   (nama file mp3 — jangan diubah kecuali nama filenya beda)
    cover:  "assets/music/song1.jpeg",   //   (nama file cover — jangan diubah kecuali nama filenya beda)
    startTime: 0,                           // ← MULAI DARI DETIK KE BERAPA
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. FOTO GALERI
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Taruh foto di:  assets/images/
   Nama file harus:  img1.jpeg  img2.jpeg  … img8.jpeg
   Ganti caption (keterangan foto) di setiap baris.               */
const GALLERY_PHOTOS = [
  { file: "img1.jpeg", caption: "ngl one smile from you and suddenly my whole world just feels softer." },  // ← GANTI CAPTION
  { file: "img2.jpeg", caption: "you're literally the reason my heart beats a lil louder, no cap." },
  { file: "img3.jpeg", caption: "every sec with you feels like a scene i wanna replay forever." },
  { file: "img4.jpeg", caption: "some people search their whole life for love, i just found mine in you, fr." },
  { file: "img5.jpeg", caption: "you turned my whole ordinary life into something this beautiful, idk how you do it." },
  { file: "img6.jpeg", caption: "home isn't a place for me anymore, it's literally just wherever you are." },
  { file: "img7.jpeg", caption: "if i could relive any moment on repeat, i'd pick every single one with you." },
  { file: "img8.jpeg", caption: "still the love of my life, like, always and forever, no doubt about it." },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. ISI SURAT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Setiap string adalah satu paragraf.
   Bisa ditambah atau dikurangi paragrafnya.                       */
const LETTER_PARAGRAPHS = [
"Happy Girlfriend Day to the most beautiful girl in my world. 🤍 Kalau ada satu hal yang paling aku syukuri dalam hidup ini, mungkin itu adalah tentang bagaimana semesta mempertemukan aku sama kamu. Kamu bukan cuma seseorang yang aku cintai, tapi kamu juga rumah tempat aku pulang, tempat aku bisa cerita tentang apa pun, dan alasan kenapa hari-hari biasa terasa jauh lebih indah. Having you in my life is one of the greatest blessings I could ever ask for.",
"Thank you for loving me in your own beautiful way, for staying through every version of me, and for accepting all the imperfect parts of who I am. Aku tahu aku nggak selalu jadi pasangan yang sempurna, kadang aku bisa bikin kamu kecewa, marah, atau capek, and for every moment I've hurt you, I'm truly sorry. Tapi satu hal yang nggak pernah berubah adalah rasa sayang aku ke kamu. I will always choose you, even on the days when things aren't easy.",
"Aku harap kamu selalu tahu betapa berharganya kamu buat aku. Aku ingin terus melihat kamu tumbuh, mengejar semua mimpi kamu, dan menjadi versi terbaik dari diri kamu sendiri. And no matter how far life takes us, I want to be the person standing beside you, celebrating your happiness, holding your hand through the hard days, and reminding you that you never have to face anything alone. Aku akan selalu ada, selama kamu masih mengizinkan aku untuk tetap di samping kamu.",
"Happy Girlfriend Day, my love. 🤍 Thank you for being the reason behind so many of my smiles, for making my world feel warmer just by existing, and for giving me a kind of love I never want to lose. I don't know what the future holds for us, but if I could choose, I'd choose you in every version of my life, in every lifetime, over and over again. I love you more than words could ever explain, today, tomorrow, and for as long as I'm lucky enough to call you mine. 🤍"

];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. KENANGAN (TIMELINE)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   depth  = kedalaman yang ditampilkan (label saja)
   year   = judul bab
   title  = judul kenangan
   text   = isi cerita                                             */
const MEMORIES = [
  {
    depth: "2m",
    year:  "Chapter One",
    title: "the way you smile",
    text:  "there's something about your smile yang selalu berhasil bikin everything feel a little softer, and somehow, I never get tired of seeing it.",
  },
  {
    depth: "8m",
    year:  "Chapter Two",
    title: "the little things",
    text:  "from the way you talk to the smallest things you do, semuanya punya cara sendiri buat bikin kamu even more beautiful without you even trying.",
  },
  {
    depth: "16m",
    year:  "Chapter Three",
    title: "the beaauty you don't see",
    text:  "you might not always see what I see in you, but I hope you know there's so much beauty in the way you care, the way you love, and the way you simply exist.",
  },
  {
    depth: "24m",
    year:  "Chapter Four",
    title: "you, just as you are",
    text:  "no matter the day, the mood, or the moment, you're still the kind of beautiful I could never fully put into words, and honestly, I wouldn't want you any other way.",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. UCAPAN ULANG TAHUN
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   icon: wave | shell | star | compass | anchor | heart
   text: isi ucapannya                                            */
const WISHES = [
  { icon: "wave",    text: "may this year give you all the calm of the ocean, dan sedalam itu juga rasa sayang aku ke kamu yang gak akan pernah surut, fr." },
  { icon: "shell",   text: "hope your days stay this bright, kayak sun yang mantul di atas water, and your nights tetap peaceful, karna you're always safe in my heart." },
  { icon: "star",    text: "may every lil wish kamu pelan-pelan come true, and may you always know how deeply and endlessly you're loved, no cap." },
  { icon: "compass", text: "wherever this year takes us, i hope kita selalu find our way back to each other, again and again, forever kalo bisa." },
  { icon: "anchor",  text: "stay soft, stay you, and tbh tetap jadi diri kamu yang sekarang — literally my favorite person to love, always." },
  { icon: "heart",   text: "happy girlfriend day istg — cheers buat kita, buat cinta ini, dan buat semua cerita indah yang masih akan datang, together." },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   JANGAN EDIT DI BAWAH INI
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function (window) {
  window.WEBSITE_PIN = String(WEBSITE_PIN);
  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   8. WHATSAPP REPLY BUTTON
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Nomor WA untuk membalas pesan setelah lilin ditiup.
   Gunakan format internasional tanpa tanda + (contoh: 62812...) */
const WHATSAPP_NUMBER = "628138100244";   // ← GANTI NOMOR WA YANG ORDER
const WHATSAPP_MESSAGE = "heyy i just opened the bottle, tysm for making my day so much better! ✨"; // ← GANTI PESAN OTOMATIS

window.OCEAN_SETTINGS = {
    recipientName:    String(RECIPIENT_NAME),
    galleryPhotos:    GALLERY_PHOTOS,
    musicTracks:      MUSIC_TRACKS,
    letterParagraphs: LETTER_PARAGRAPHS,
    memories:         MEMORIES,
    wishes:           WISHES,
    whatsappNumber:   WHATSAPP_NUMBER,
    whatsappMessage:  WHATSAPP_MESSAGE
  };
})(window);