# Ajju Ration Seva

हिंदी में उत्तर प्रदेश राशन कार्ड सेवाओं की जानकारी देने वाला mobile-friendly static website.

## Files
- index.html — home page
- style.css — responsive styling
- script.js — service search and demo help form
- admin.html / admin.js — local browser demo admin panel

## GitHub Pages publish
1. Repository Settings → Pages खोलें.
2. Build and deployment में **Deploy from a branch** चुनें.
3. Branch **main**, folder **/(root)** चुनकर Save करें.
4. Publish होने में कुछ मिनट लग सकते हैं.

## Important limitations
GitHub Pages static hosting है; secure server-side admin login या private database नहीं देता। Admin page सार्वजनिक demo है और केवल उसी browser के localStorage से entries पढ़ता है। वास्तविक shared request management के लिए Firebase Authentication + Firestore security rules या सुरक्षित backend जरूरी है। Aadhaar number, OTP, bank details या passwords इस demo form में न भरें। यह स्वतंत्र सहायता पोर्टल है, सरकारी वेबसाइट नहीं।

Official information links: https://fcs.up.gov.in/ and https://nfsa.gov.in/
