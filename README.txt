JEWLORA WEBSITE STARTER — BEGINNER GUIDE
========================================

WHAT THIS PACKAGE CONTAINS
- index.html  = website structure and text
- style.css   = website design
- script.js   = products, search, cart and WhatsApp ordering
- images/     = put all product photographs here

THE EASIEST APP TO EDIT THE CODE
1. Install Visual Studio Code (VS Code) on your computer.
2. Extract this ZIP file.
3. Open VS Code.
4. Click File > Open Folder.
5. Select the folder "jewlora_website_starter".
6. Install the VS Code extension called "Live Server".
7. Open index.html.
8. Click "Go Live" at the bottom of VS Code.

HOW TO ADD YOUR PHOTOS
Rename your images exactly:
- hero.jpg
- editorial.jpg
- product-1.jpg
- product-2.jpg
...through product-8.jpg

Put them inside the images folder.

HOW TO CHANGE PRODUCTS
Open script.js. At the top, edit:
- name
- category
- price
- mrp
- badge
- image

HOW TO CHANGE WHATSAPP NUMBER
Search all files for:
91XXXXXXXXXX
Replace it with your country code and number, without + or spaces.
Example: 919876543210

HOW TO CHANGE EMAIL
In index.html, replace:
hello@jewlora.in

HOW TO PUBLISH FREE
Beginner route:
1. Create a GitHub account.
2. Create a new public repository named jewlora-website.
3. Upload all these files.
4. Open repository Settings > Pages.
5. Choose deployment from the main branch.
6. GitHub will give you a temporary live link.
7. In Pages settings, add your own domain under Custom domain.
8. Update DNS records at the company where you bought the domain.

IMPORTANT LIMITATION
This starter uses WhatsApp checkout. It does not securely process online payments.
Never place a Razorpay secret key directly inside script.js or HTML.

FOR A COMPLETE E-COMMERCE WEBSITE
The next version needs:
- secure admin login
- product/database management
- stock control
- customer addresses
- order database
- Razorpay checkout
- server-side payment verification
- shipping integration
- email/SMS/WhatsApp notifications
- legal pages and GST invoices

A sensible technology setup:
- Frontend: Next.js
- Hosting: Vercel
- Database/auth/storage: Supabase
- Payments: Razorpay
- Shipping: Shiprocket or another courier aggregator

Start with this version to finalize design, photos, categories and product data.
