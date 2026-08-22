/**
 * Legal pages — verbatim from the client's documents received 22 Aug 2026:
 *   "GlowWithin - Return Policy.docx", "GlowWithin - Privacy Policy New.docx",
 *   "GlowWithin - T & C.docx".
 * Structure only (headings / paragraphs / lists / contact blocks); wording is
 * the client's. Generated from the documents — edit the documents, not this.
 */

export type LegalBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { lead: string }
  | { ul: string[] }
  | { contact: { org: string; rows: [string, string][] } };

export interface LegalDocument {
  title: string;
  blocks: LegalBlock[];
}

export const returnsPolicy: LegalDocument = {
  "title": "Shipping, Returns, Refunds & Cancellations",
  "blocks": [
    {
      "h2": "Shipping"
    },
    {
      "h3": "What is the cost of shipping?"
    },
    {
      "p": "All the orders are eligible for free shipping."
    },
    {
      "h3": "How long will it take for my order to reach me?"
    },
    {
      "h3": "Please refer to your Order Details page for the estimated shipping and delivery timeline."
    },
    {
      "p": "Once your order has been shipped, it generally takes 5–7 business days to reach you, depending on your location and courier service."
    },
    {
      "p": "Estimated delivery timelines are indicative and may occasionally be affected by circumstances beyond our control."
    },
    {
      "p": "In case of an unexpected delay, we will keep you informed."
    },
    {
      "h3": "What can I do if my order is delayed?"
    },
    {
      "p": "We always try our best to deliver your GlowWithin™ order within the estimated delivery timeline."
    },
    {
      "p": "If your order has not reached you by the expected delivery date, please contact our Customer Support Team with your order details. We will check the status with our delivery partner and assist you at the earliest."
    },
    {
      "h2": "Returns, Replacements & Refunds"
    },
    {
      "h3": "At GlowWithin™, we want you to receive your products in perfect condition."
    },
    {
      "p": "For hygiene and safety reasons, we accept returns/replacements only in cases where the product delivered is wrong, expired, damaged, tampered, incomplete, or missing."
    },
    {
      "h3": "How do I raise a return or replacement request?"
    },
    {
      "h3": "Step 1 — Raise your request"
    },
    {
      "p": "For wrong or expired products, please raise a return/replacement request within 7 days of delivery."
    },
    {
      "h3": "For damaged or missing products, please raise your request within 2 days of delivery."
    },
    {
      "p": "Please provide your order number, contact details, photographs/videos of the product and packaging, wherever applicable, to help us process your request quickly."
    },
    {
      "p": "You may contact our Customer Support Team through the available support channels on the GlowWithin™ website."
    },
    {
      "h3": "Step 2 — Request review"
    },
    {
      "p": "Please allow up to 2 business days for our team to review your request and validate the concern."
    },
    {
      "h3": "Step 3 — Reverse pickup"
    },
    {
      "p": "Once your request is approved, we may arrange a pickup through our courier partner."
    },
    {
      "h3": "Step 4 — Self-shipping, if required"
    },
    {
      "p": "If reverse pickup is not available at your location, you may be requested to ship the product to us through a reliable courier service."
    },
    {
      "p": "Where applicable, eligible courier charges will be reimbursed as per our return policy."
    },
    {
      "h3": "Step 5 — Quality verification & resolution"
    },
    {
      "p": "Once the product reaches us, it will be inspected against the return/replacement request."
    },
    {
      "h3": "After successful verification, we will initiate the applicable replacement or refund."
    },
    {
      "p": "Replacement is subject to product availability."
    },
    {
      "h3": "Under what conditions can I return or replace my product?"
    },
    {
      "p": "A return/replacement request may be accepted in the following situations:"
    },
    {
      "ul": [
        "Wrong product delivered",
        "Expired product delivered",
        "Product received in damaged condition",
        "Product or packaging received tampered",
        "Product received with missing components",
        "Incomplete order",
        "One or more products missing from the order"
      ]
    },
    {
      "h3": "When will a return/replacement request not be accepted?"
    },
    {
      "p": "Return/replacement requests may not be accepted in the following situations:"
    },
    {
      "ul": [
        "The product has been opened, used, consumed or altered",
        "The product has been damaged after delivery due to misuse or improper handling",
        "Original product packaging, labels or other identifying information is missing",
        "The return/replacement request is raised beyond the applicable return window",
        "A damaged or missing product is reported beyond 2 days from delivery",
        "The product is returned without the required product/packaging details needed for verification",
        "The product does not match the product originally delivered by GlowWithin™"
      ]
    },
    {
      "p": "Please retain the original product, packaging, labels and invoice until your return/replacement request is completely resolved."
    },
    {
      "h3": "How are returns processed?"
    },
    {
      "p": "Once your return/replacement request is approved, a pickup may be arranged through our courier partner."
    },
    {
      "p": "The product will be returned to our facility and inspected by our quality team."
    },
    {
      "p": "Once the product passes the required verification, the applicable replacement or refund will be processed."
    },
    {
      "p": "The pickup timeline may vary depending on your location and courier availability."
    },
    {
      "h2": "Cancellations"
    },
    {
      "h3": "Can I cancel my order?"
    },
    {
      "h3": "You may request cancellation of your order before it is shipped."
    },
    {
      "p": "Please contact GlowWithin™ Customer Support 7075792176 (Mon - Sat - 9 am to 6 pm) as soon as possible with your order number."
    },
    {
      "p": "Once an order has been shipped, cancellation may no longer be possible. In such cases, please contact our Customer Support Team for assistance."
    },
    {
      "p": "GlowWithin™ reserves the right to cancel or refuse an order in certain circumstances, including suspected fraudulent transactions, incorrect pricing or product information, stock unavailability, or other circumstances requiring cancellation."
    },
    {
      "h2": "Refunds"
    },
    {
      "h3": "How will I receive my refund?"
    },
    {
      "p": "For prepaid orders, eligible refunds will generally be credited to the original payment method used for the transaction."
    },
    {
      "p": "For Cash on Delivery (COD) orders, you may be required to provide valid bank account details to process an eligible refund."
    },
    {
      "h3": "How long does it take to receive a refund?"
    },
    {
      "p": "For eligible cancelled orders, refunds will generally be initiated within 7 business days after cancellation is confirmed."
    },
    {
      "p": "For returned products, the refund will be initiated only after:"
    },
    {
      "ul": [
        "The returned product reaches our facility; and",
        "The required quality/return verification is completed."
      ]
    },
    {
      "p": "The time taken for the refund to reflect in your account may additionally depend on your bank or payment service provider."
    },
    {
      "h3": "Can I return part of my order?"
    },
    {
      "p": "Yes."
    },
    {
      "p": "If multiple products are included in your order, you may request a return/replacement for an eligible individual product within the applicable return window."
    },
    {
      "p": "The remaining products in your order do not need to be returned unless they are also part of the approved return/replacement request."
    },
    {
      "h2": "Important Note"
    },
    {
      "p": "For any issue related to your GlowWithin™ order, please contact our Customer Support Team with your order number and relevant product details."
    },
    {
      "p": "We recommend keeping your product, packaging, invoice and delivery information until your concern has been successfully resolved."
    }
  ]
};

export const privacyPolicy: LegalDocument = {
  "title": "Privacy Policy",
  "blocks": [
    {
      "lead": "Effective Date: 22 August 2026"
    },
    {
      "p": "GlowWithin™ is a brand of Sri Varamaha Wellness (P) Ltd. (“Company”, “we”, “our” or “us”). We respect your privacy and are committed to protecting your Personal Information. This Privacy Policy explains how we collect, use, store and share information when you access or use our website, place an order, contact us or otherwise interact with GlowWithin™."
    },
    {
      "p": "By accessing or using our website and providing your information, you consent to the collection and use of your Personal Information in accordance with this Privacy Policy. If you do not agree with this Policy, please discontinue use of the website."
    },
    {
      "p": "This Policy applies to information collected online through the GlowWithin™ website and related digital platforms. It does not apply to third-party websites or services that are not controlled by us."
    },
    {
      "h2": "1. WHAT IS PERSONAL INFORMATION?"
    },
    {
      "p": "“Personal Information” means information that identifies or can reasonably be used to identify you, directly or indirectly, such as your name, contact details, address, order information or other information associated with you."
    },
    {
      "p": "Information that is publicly available or otherwise lawfully available in the public domain may not be considered Personal Information under applicable law."
    },
    {
      "h2": "2. HOW DO WE COLLECT YOUR INFORMATION?"
    },
    {
      "h3": "We may collect information when you:"
    },
    {
      "ul": [
        "Create an account on our website;",
        "Place an order or make a payment;",
        "Contact our customer-support team;",
        "Subscribe to our communications;",
        "Participate in surveys, contests, offers or promotions;",
        "Submit product reviews, feedback or other content;",
        "Interact with us through social media; or",
        "Browse or interact with our website."
      ]
    },
    {
      "p": "We may also automatically collect certain technical information through cookies and similar technologies, such as IP address, browser type, device information, pages visited and website usage patterns."
    },
    {
      "p": "We may receive limited information from authorised third-party service providers, such as delivery, payment, analytics and marketing partners, where permitted by law."
    },
    {
      "h2": "3. WHAT INFORMATION DO WE COLLECT?"
    },
    {
      "p": "Depending on how you interact with us, we may collect:"
    },
    {
      "ul": [
        "Name;",
        "Mobile number;",
        "Email address;",
        "Billing and delivery address;",
        "Country and general location;",
        "Order and purchase history;",
        "Product preferences and interests;",
        "Customer-support communications;",
        "Reviews, feedback and other content you voluntarily provide;",
        "Device, browser and IP information;",
        "Website usage and interaction data; and",
        "Payment-related information required to process transactions."
      ]
    },
    {
      "p": "Payment card and banking information is generally processed through authorised payment service providers. We do not ordinarily store complete card or banking credentials on our own systems."
    },
    {
      "h2": "4. WHY DO WE COLLECT YOUR INFORMATION?"
    },
    {
      "h3": "We may use your Personal Information to:"
    },
    {
      "ul": [
        "Create and manage your account;",
        "Process and deliver your orders;",
        "Process payments, cancellations, returns and refunds;",
        "Provide customer support;",
        "Communicate with you about your orders and account;",
        "Respond to your questions, reviews and feedback;",
        "Send promotional communications where permitted and based on your preferences;",
        "Conduct surveys, contests and promotional activities;",
        "Understand customer preferences and improve our products and services;",
        "Improve the functionality, security and performance of our website;",
        "Analyse website usage and customer trends;",
        "Detect and prevent fraud, misuse and other unlawful activity;",
        "Comply with applicable laws, regulations and legal requirements;",
        "Protect our rights, property and customers; and",
        "Establish, exercise or defend legal claims."
      ]
    },
    {
      "p": "We may also use information in an aggregated or anonymised form for analytics, research and business improvement. Such information is designed so that it does not identify individual customers."
    },
    {
      "h2": "5. BASIS FOR PROCESSING INFORMATION"
    },
    {
      "h3": "We process Personal Information where necessary for purposes such as:"
    },
    {
      "ul": [
        "Fulfilling your order or providing requested services;",
        "Complying with legal or regulatory obligations;",
        "Protecting our legitimate business interests, such as improving our services, preventing fraud and communicating with customers; and",
        "Your consent, where consent is required under applicable law."
      ]
    },
    {
      "p": "Where processing is based on consent, you may withdraw your consent subject to the provisions of this Policy and applicable law."
    },
    {
      "h2": "6. MARKETING COMMUNICATIONS"
    },
    {
      "p": "If you choose to receive promotional communications from GlowWithin™, we may contact you through email, SMS, WhatsApp, telephone or other permitted channels regarding products, offers and updates."
    },
    {
      "p": "You can opt out of promotional communications at any time by:"
    },
    {
      "ul": [
        "Clicking the “Unsubscribe” option in promotional emails;",
        "Following the opt-out instructions provided in our communications; or",
        "Contacting our Customer Support Team."
      ]
    },
    {
      "p": "Even if you opt out of promotional communications, we may continue to send essential transactional communications relating to your orders, payments, delivery, returns or account."
    },
    {
      "h2": "7. HOW DO WE SHARE YOUR INFORMATION?"
    },
    {
      "h3": "We do not sell or rent your Personal Information to third parties."
    },
    {
      "p": "We may share relevant information with trusted service providers who assist us in operating our business, including:"
    },
    {
      "ul": [
        "Payment processors;",
        "Courier and delivery partners;",
        "Website and technology service providers;",
        "Cloud-storage providers;",
        "Customer-support providers;",
        "Analytics and marketing service providers; and",
        "Other service providers engaged by us for legitimate business purposes."
      ]
    },
    {
      "p": "Such service providers are expected to use the information only for the purposes for which it is provided and in accordance with applicable law and contractual obligations."
    },
    {
      "p": "We may also disclose Personal Information:"
    },
    {
      "ul": [
        "When required by law or legal process;",
        "To government, regulatory or law-enforcement authorities where legally required;",
        "To protect the rights, safety or property of GlowWithin™, our customers or others;",
        "To investigate fraud or unlawful activity; or",
        "In connection with a merger, acquisition, restructuring, sale or transfer of all or part of our business."
      ]
    },
    {
      "h2": "8. PAYMENT INFORMATION"
    },
    {
      "p": "Payments made through the GlowWithin™ website may be processed through authorised third-party payment service providers."
    },
    {
      "p": "Payment information is transmitted through appropriate secure payment systems. Payment service providers may process your information in accordance with their own privacy policies and applicable security standards."
    },
    {
      "p": "GlowWithin™ does not ordinarily store complete credit-card, debit-card or banking credentials."
    },
    {
      "h2": "9. COOKIES AND SIMILAR TECHNOLOGIES"
    },
    {
      "h3": "GlowWithin™ may use cookies and similar technologies to:"
    },
    {
      "ul": [
        "Remember your preferences;",
        "Keep products in your shopping cart;",
        "Understand how visitors use our website;",
        "Improve website functionality;",
        "Measure website performance;",
        "Provide relevant content and advertising; and",
        "Analyse website traffic and trends."
      ]
    },
    {
      "p": "You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect some website functionality."
    },
    {
      "p": "By continuing to use our website, you consent to the use of cookies in accordance with this Policy and applicable law."
    },
    {
      "h2": "10. THIRD-PARTY ANALYTICS AND SERVICES"
    },
    {
      "p": "We may use third-party analytics and technology services to understand website traffic, customer behaviour, campaign performance and website usage."
    },
    {
      "p": "These service providers may use cookies or similar technologies to collect information on our behalf."
    },
    {
      "p": "Third-party services are governed by their respective privacy policies. We encourage you to review those policies when using such services."
    },
    {
      "h2": "11. SOCIAL MEDIA"
    },
    {
      "p": "GlowWithin™ may maintain pages or profiles on social media platforms such as Instagram, Facebook, YouTube, LinkedIn or other platforms."
    },
    {
      "p": "If you interact with us through social media, we may receive information made available to us according to your privacy settings and the policies of the relevant platform."
    },
    {
      "p": "Your use of social media platforms is governed by their respective terms and privacy policies."
    },
    {
      "h2": "12. CUSTOMER REVIEWS AND CONTENT"
    },
    {
      "p": "If you voluntarily submit a review, photograph, testimonial, comment or other content to GlowWithin™, the information you choose to make public may be viewed by others."
    },
    {
      "p": "Please do not submit sensitive or personal information that you do not wish to make publicly available."
    },
    {
      "p": "Where permitted by applicable law, GlowWithin™ may use customer reviews or other submitted content for legitimate business, communication and promotional purposes."
    },
    {
      "h2": "13. CUSTOMER SUPPORT CALLS"
    },
    {
      "p": "Calls or communications with our customer-support team may be recorded or retained for purposes such as:"
    },
    {
      "ul": [
        "Customer-service improvement;",
        "Quality monitoring;",
        "Training;",
        "Complaint resolution; and",
        "Compliance with applicable law."
      ]
    },
    {
      "h2": "14. DATA RETENTION"
    },
    {
      "p": "We retain Personal Information only for as long as reasonably necessary to fulfil the purposes for which it was collected, provide our services, maintain business records, resolve disputes, prevent fraud or comply with legal and regulatory requirements."
    },
    {
      "p": "When Personal Information is no longer required, we will take reasonable steps to delete, anonymise or securely dispose of it, subject to applicable legal requirements."
    },
    {
      "h2": "15. DATA SECURITY"
    },
    {
      "p": "We take reasonable administrative, technical and organisational measures designed to protect your Personal Information from unauthorised access, loss, misuse, alteration, disclosure or destruction."
    },
    {
      "p": "Access to Personal Information is restricted to authorised persons and service providers who require it for legitimate business purposes."
    },
    {
      "p": "Where appropriate, we use security technologies and controls such as encryption, authentication, access controls and secure networks."
    },
    {
      "p": "However, no method of transmitting or storing information online can be guaranteed to be completely secure. Therefore, while we take reasonable precautions, we cannot guarantee absolute security of your information."
    },
    {
      "h2": "16. YOUR CHOICES AND RIGHTS"
    },
    {
      "h3": "Subject to applicable law, you may have the right to:"
    },
    {
      "ul": [
        "Request access to Personal Information held about you;",
        "Request correction of inaccurate or incomplete information;",
        "Request deletion of information where legally permissible;",
        "Withdraw consent where processing is based on consent;",
        "Opt out of promotional communications; and",
        "Raise concerns regarding the handling of your Personal Information."
      ]
    },
    {
      "p": "To exercise these rights, please contact us using the details provided below."
    },
    {
      "p": "We may need to verify your identity before processing certain requests."
    },
    {
      "h2": "17. WITHDRAWAL OF CONSENT"
    },
    {
      "p": "Where we process your Personal Information based on your consent, you may withdraw that consent by contacting us."
    },
    {
      "p": "Withdrawal of consent will not affect the lawfulness of processing carried out before withdrawal."
    },
    {
      "p": "Certain information may continue to be retained where required for legal, regulatory, accounting, fraud-prevention, dispute-resolution or other legitimate purposes."
    },
    {
      "h2": "18. CHILDREN'S PRIVACY"
    },
    {
      "p": "The GlowWithin™ website is not intended for individuals below 18 years of age, and we do not knowingly collect Personal Information from children."
    },
    {
      "p": "If we become aware that Personal Information of a child has been collected inadvertently, we will take reasonable steps to delete it, subject to applicable law."
    },
    {
      "h2": "19. THIRD-PARTY WEBSITES"
    },
    {
      "h3": "Our website may contain links to third-party websites, applications or services."
    },
    {
      "p": "GlowWithin™ does not control the privacy practices of such third parties and is not responsible for their content, security or privacy practices."
    },
    {
      "p": "We recommend reviewing the privacy policy of every third-party website before providing your Personal Information."
    },
    {
      "h2": "20. STORAGE OF PERSONAL INFORMATION"
    },
    {
      "p": "Your Personal Information may be stored on our systems or with authorised third-party service providers, including cloud-service providers, used to support our business operations."
    },
    {
      "p": "Such providers are expected to implement appropriate safeguards for protecting Personal Information in accordance with applicable law and contractual requirements."
    },
    {
      "h2": "21. CHANGES TO THIS PRIVACY POLICY"
    },
    {
      "p": "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, products, services or applicable laws."
    },
    {
      "h3": "The updated Policy will be published on this page with a revised “Effective Date.”"
    },
    {
      "p": "We encourage you to review this Policy periodically."
    },
    {
      "p": "Your continued use of the Website after an updated Policy is published will be subject to the revised Policy, to the extent permitted by applicable law."
    },
    {
      "h2": "22. PRIVACY CONCERNS & GRIEVANCE REDRESSAL"
    },
    {
      "p": "If you have questions, concerns, requests or complaints regarding the collection or use of your Personal Information, please contact:"
    },
    {
      "contact": {
        "org": "Sri Varamaha Wellness (P) Ltd. · Brand: GlowWithin™",
        "rows": [
          [
            "Customer Support Email",
            "feedback@glowwithin.co.in; customercare@glowwithin.co.in"
          ],
          [
            "Customer Support Phone",
            "+91 70757 92176"
          ],
          [
            "Customer Support Hours",
            "Mon–Sat, 9:00 AM – 6:00 PM"
          ]
        ]
      }
    },
    {
      "h3": "Grievance Officer"
    },
    {
      "contact": {
        "org": "Grievance Officer",
        "rows": [
          [
            "Email",
            "operationshead@glowwithin.co.in"
          ],
          [
            "Phone",
            "+91 70757 92176"
          ],
          [
            "Working Hours",
            "Mon–Sat, 9:00 AM – 6:00 PM"
          ]
        ]
      }
    },
    {
      "p": "We will endeavour to address privacy-related requests and grievances within the timelines prescribed under applicable law."
    }
  ]
};

export const termsPolicy: LegalDocument = {
  "title": "Terms & Conditions",
  "blocks": [
    {
      "lead": "Effective Date: 22 August 2026"
    },
    {
      "p": "This document is an electronic record in terms of the Information Technology Act, 2000 and the rules made thereunder, as applicable, and is published in accordance with applicable laws, including the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020, as applicable."
    },
    {
      "p": "This electronic record is generated by a computer system and does not require any physical or digital signature."
    },
    {
      "h3": "PLEASE READ THESE TERMS & CONDITIONS CAREFULLY"
    },
    {
      "p": "These Terms & Conditions (“T&C”, “Terms”, or “Terms and Conditions”) govern your access to and use of the GlowWithin™ website, www.glowwithin.co.in, including any mobile version, application, online store, features, services and facilities made available through the website (collectively referred to as the “Website”), and your purchase or use of products offered through the Website."
    },
    {
      "p": "The Website and the products available through it are owned, operated, marketed and/or distributed by Sri Varamaha Wellness (P) Ltd. (hereinafter referred to as the “Company”, “Sri Varamaha Wellness”, “GlowWithin™”, “we”, “us” or “our”, as applicable)."
    },
    {
      "p": "By accessing, browsing, using the Website, creating an account, placing an order, purchasing or using any product offered through the Website, you acknowledge that you have read, understood and agreed to be bound by these T&C, together with our Privacy Policy, Shipping Policy, Return & Refund Policy and any other applicable policies displayed on the Website."
    },
    {
      "p": "If you do not agree with these T&C, please discontinue your use of the Website."
    },
    {
      "h2": "1. ELIGIBILITY"
    },
    {
      "p": "Only persons who are competent to enter into a legally binding contract under applicable Indian law may use the Website and/or purchase products through the Website."
    },
    {
      "p": "If you are a minor, you may access or use the Website only under the supervision of, and with the involvement of, your parent or legal guardian."
    },
    {
      "p": "If you are accessing or using the Website on behalf of a company, partnership, proprietorship, organisation or other legal entity, you represent that you have the necessary authority to bind such entity to these T&C."
    },
    {
      "h2": "2. CHANGES TO THESE TERMS"
    },
    {
      "p": "Sri Varamaha Wellness (P) Ltd. reserves the right to amend, modify, update or revise these T&C at any time by publishing the revised version on the Website."
    },
    {
      "p": "The updated T&C shall become effective upon being published on the Website unless otherwise stated."
    },
    {
      "p": "Your continued access to or use of the Website after such changes constitutes your acceptance of the revised T&C."
    },
    {
      "p": "We encourage you to review these T&C periodically, particularly before placing an order."
    },
    {
      "p": "The version of the T&C applicable to your order will ordinarily be the version displayed on the Website at the time you place your order."
    },
    {
      "h2": "3. LAWFUL USE"
    },
    {
      "p": "You may use the Website only for lawful purposes and in accordance with these T&C."
    },
    {
      "p": "You are solely responsible for ensuring that your use of the Website complies with all applicable laws, rules and regulations."
    },
    {
      "p": "You shall not use the Website:"
    },
    {
      "ul": [
        "For any unlawful or fraudulent purpose;",
        "To impersonate another person or entity;",
        "To interfere with the operation or security of the Website;",
        "To gain unauthorised access to any account, system or information;",
        "To transmit viruses, malware or other harmful code;",
        "To collect or misuse personal information of other users;",
        "To distribute spam, unsolicited communications or promotional material;",
        "To infringe the intellectual property rights of the Company or any third party; or",
        "In any manner that may damage, disable, overburden or impair the Website or interfere with another user's access to it."
      ]
    },
    {
      "h2": "4. GLOWWITHIN™ PRODUCTS"
    },
    {
      "p": "The Website offers personal-care and beauty products under the GlowWithin™ brand, including products relating to hair care, skin care, face care, intimate care and other wellness or personal-care categories that may be introduced from time to time."
    },
    {
      "p": "The products may include, without limitation:"
    },
    {
      "ul": [
        "Hair care products;",
        "Hair serums and related products;",
        "Face serums;",
        "Face creams and moisturisers;",
        "Intimate care products; and",
        "Other beauty, personal-care and wellness products introduced by Sri Varamaha Wellness (P) Ltd."
      ]
    },
    {
      "p": "The Company reserves the right to:"
    },
    {
      "ul": [
        "Add, modify, suspend or discontinue any product;",
        "Change product formulations, packaging or specifications where appropriate;",
        "Limit the quantity of products available for purchase;",
        "Correct pricing or product-information errors; and",
        "Refuse or cancel an order where circumstances reasonably require it."
      ]
    },
    {
      "p": "Products displayed on the Website are intended primarily for personal use unless otherwise expressly authorised by the Company."
    },
    {
      "p": "You may not commercially resell GlowWithin™ products purchased through the Website without prior written authorisation from Sri Varamaha Wellness (P) Ltd."
    },
    {
      "h2": "5. PRODUCT INFORMATION"
    },
    {
      "p": "We make reasonable efforts to ensure that product descriptions, ingredient information, photographs, specifications, pricing and other information displayed on the Website are accurate and up to date."
    },
    {
      "p": "However, minor variations may occur due to:"
    },
    {
      "ul": [
        "Product batches;",
        "Packaging updates;",
        "Screen/device display settings;",
        "Photography, lighting or AI-related rendering;",
        "Printing variations; or",
        "Updates to product presentation."
      ]
    },
    {
      "p": "Product images displayed on the Website are for representation purposes and may not always exactly match the physical product received."
    },
    {
      "p": "The Company does not warrant that every description, image, colour representation, specification or other content on the Website will always be completely accurate, current or error-free."
    },
    {
      "p": "Where applicable, customers should read the product label, packaging, ingredients, directions for use, warnings and precautions before using any GlowWithin™ product."
    },
    {
      "h2": "6. PERSONAL-CARE PRODUCT DISCLAIMER"
    },
    {
      "p": "GlowWithin™ products are personal-care and beauty products intended for their stated purposes."
    },
    {
      "p": "Product information provided on the Website is intended for general informational purposes and should not be construed as medical advice, diagnosis or treatment."
    },
    {
      "p": "Individual experiences with personal-care products may vary."
    },
    {
      "p": "If you have known allergies, sensitivities or specific skin, scalp or other personal-care concerns, you should review the product ingredients and usage information before use and seek appropriate professional advice where necessary."
    },
    {
      "p": "Discontinue use if irritation, discomfort or an adverse reaction occurs and seek appropriate professional advice where required."
    },
    {
      "h2": "7. PRICING AND AVAILABILITY"
    },
    {
      "p": "All product prices displayed on the Website are subject to change without prior notice."
    },
    {
      "p": "Unless otherwise specified, displayed prices are inclusive of applicable GST or other applicable taxes."
    },
    {
      "p": "Delivery/shipping charges, where applicable, will be displayed during the checkout process."
    },
    {
      "p": "All the orders placed on our website are eligible for free delivery."
    },
    {
      "p": "The Company reserves the right to correct any pricing, product or availability error."
    },
    {
      "p": "If an order has been placed at an incorrect price due to an obvious technical or system error, the Company may contact the customer and, where appropriate, cancel the affected order and refund any amount already paid."
    },
    {
      "p": "Prices and offers available through the GlowWithin™ Website may differ from prices or offers available through third-party marketplaces, offline retailers or other sales channels."
    },
    {
      "h2": "8. ORDERS"
    },
    {
      "p": "Placing an order on the Website constitutes an offer by you to purchase the selected products."
    },
    {
      "p": "An order confirmation does not necessarily constitute final acceptance of the order."
    },
    {
      "p": "The Company reserves the right to accept, reject, cancel or limit an order for reasons including:"
    },
    {
      "ul": [
        "Product unavailability;",
        "Incorrect pricing or product information;",
        "Quantity restrictions;",
        "Payment-related issues;",
        "Suspected fraudulent or suspicious activity;",
        "Incorrect delivery information;",
        "Technical errors; or",
        "Other legitimate business or operational reasons."
      ]
    },
    {
      "p": "If an order is cancelled after payment has been received, the eligible amount will be refunded in accordance with the applicable refund process."
    },
    {
      "h2": "9. CUSTOMER COMMUNICATION"
    },
    {
      "p": "By creating an account, placing an order, submitting your contact information or otherwise interacting with the Website, you agree that Sri Varamaha Wellness may communicate with you regarding:"
    },
    {
      "ul": [
        "Order confirmation;",
        "Payment;",
        "Shipping and delivery;",
        "Order tracking;",
        "Returns and refunds;",
        "Customer-service queries;",
        "Product or service-related information; and",
        "Promotional or marketing communications, where permitted by applicable law and subject to your preferences and consent requirements."
      ]
    },
    {
      "p": "Communications may be made through email, SMS, telephone, WhatsApp or other communication channels, as applicable."
    },
    {
      "p": "You may opt out of promotional communications by using the unsubscribe mechanism provided in such communication or by contacting our customer-support team."
    },
    {
      "p": "Opting out of promotional communications will not prevent us from sending essential transactional or service-related communications concerning your orders or account."
    },
    {
      "h2": "10. INTELLECTUAL PROPERTY"
    },
    {
      "p": "All intellectual property relating to the GlowWithin™ brand and Website, including but not limited to:"
    },
    {
      "ul": [
        "GlowWithin™ name and trademarks;",
        "Logos;",
        "Product names;",
        "Product packaging and trade dress;",
        "Photographs;",
        "Illustrations;",
        "Graphics;",
        "Website design;",
        "Text and written content;",
        "Videos;",
        "Product descriptions;",
        "Marketing materials;",
        "Website layouts;",
        "Software and technology; and",
        "Other proprietary content"
      ]
    },
    {
      "p": "is owned by, licensed to, or otherwise lawfully used by Sri Varamaha Wellness (P) Ltd. and/or its respective licensors."
    },
    {
      "p": "Nothing contained on the Website shall be interpreted as granting you any licence or right to use the Company's intellectual property without prior written permission."
    },
    {
      "p": "You may not copy, reproduce, modify, publish, distribute, transmit, display, create derivative works from, commercially exploit or otherwise use any GlowWithin™ content or intellectual property without prior written authorisation."
    },
    {
      "h2": "11. USER ACCOUNT"
    },
    {
      "p": "You may be required to create an account to access certain features of the Website or place an order."
    },
    {
      "p": "You are responsible for:"
    },
    {
      "ul": [
        "Maintaining the confidentiality of your login credentials;",
        "Providing accurate and current information;",
        "Maintaining the security of your account;",
        "Restricting unauthorised access to your account; and",
        "All activities carried out through your account."
      ]
    },
    {
      "p": "Accounts are personal and may not be sold, transferred or shared without authorisation."
    },
    {
      "p": "If you believe that your account or password has been compromised, please contact us immediately."
    },
    {
      "p": "The Company may suspend, restrict or terminate an account if it reasonably believes that the account has been used in violation of these T&C, applicable law or for fraudulent or abusive activity."
    },
    {
      "h2": "12. WEBSITE CONTENT AND THIRD-PARTY LINKS"
    },
    {
      "p": "The Website may contain educational, informational, promotional and other content relating to beauty, personal care, hair care, skin care, intimate care and wellness."
    },
    {
      "p": "Such information is provided for general informational purposes."
    },
    {
      "p": "The Website may also contain links to third-party websites, applications or services."
    },
    {
      "p": "Such links are provided for convenience only. Sri Varamaha Wellness does not necessarily endorse, control or assume responsibility for third-party websites, their content, availability, privacy practices or terms."
    },
    {
      "p": "Your use of any third-party website is subject to that third party's own terms and policies."
    },
    {
      "h2": "13. USER-GENERATED CONTENT"
    },
    {
      "p": "Where the Website permits customers to submit reviews, photographs, comments, testimonials or other content (“User Content”), you remain responsible for the content you submit."
    },
    {
      "p": "By submitting User Content, you confirm that:"
    },
    {
      "ul": [
        "You have the necessary rights to submit the content;",
        "The content is truthful to the best of your knowledge;",
        "The content does not violate any applicable law;",
        "The content does not infringe the rights of any third party; and",
        "The content does not contain unlawful, offensive, defamatory, obscene or abusive material."
      ]
    },
    {
      "p": "To the extent permitted by applicable law, you grant Sri Varamaha Wellness a non-exclusive, royalty-free licence to use, reproduce, display and publish such User Content for legitimate business, marketing and promotional purposes, subject to our Privacy Policy and applicable law."
    },
    {
      "p": "The Company reserves the right to remove User Content that it considers inappropriate, unlawful, misleading or inconsistent with these T&C."
    },
    {
      "h2": "14. WEBSITE SECURITY"
    },
    {
      "p": "You must not attempt to compromise the security or integrity of the Website."
    },
    {
      "p": "This includes, without limitation:"
    },
    {
      "ul": [
        "Accessing data or accounts without authorisation;",
        "Attempting to breach authentication or security measures;",
        "Probing or scanning the Website for vulnerabilities without authorisation;",
        "Introducing viruses, malware or harmful code;",
        "Interfering with Website operations;",
        "Flooding, spamming or overloading the Website;",
        "Attempting to obtain unauthorised access to servers or systems; or",
        "Using the Website for any activity that may threaten the security, integrity or availability of the Website."
      ]
    },
    {
      "p": "Any unauthorised attempt to interfere with the Website may result in suspension of access and may also attract civil or criminal liability under applicable law."
    },
    {
      "h2": "15. PAYMENT METHODS"
    },
    {
      "p": "Payments for products available on the Website may be made using payment methods made available at checkout, which may include:"
    },
    {
      "ul": [
        "Credit cards;",
        "Debit cards;",
        "Net banking;",
        "UPI;",
        "QR-based payments;",
        "Digital payment methods;",
        "Other payment instruments supported by our payment partners; and",
        "Cash on Delivery, where available."
      ]
    },
    {
      "p": "Payment methods and availability may vary depending on location, order value, product category and other applicable conditions."
    },
    {
      "p": "All payments are subject to the terms and conditions of the relevant payment service provider."
    },
    {
      "h2": "16. CASH ON DELIVERY"
    },
    {
      "p": "Cash on Delivery (“COD”) may be available for eligible orders and locations."
    },
    {
      "p": "The Company reserves the right to:"
    },
    {
      "ul": [
        "Restrict COD availability;",
        "Set minimum or maximum order values for COD;",
        "Request additional verification of COD orders; or",
        "Cancel COD orders that cannot be verified or appear suspicious."
      ]
    },
    {
      "h2": "17. CHAT AND CUSTOMER SUPPORT"
    },
    {
      "p": "The Website may provide chat or other customer-support facilities to assist customers with Website, product and order-related queries."
    },
    {
      "p": "The Company may modify, suspend or discontinue the chat facility at any time."
    },
    {
      "p": "Customer-support response times may vary depending on the nature and volume of queries."
    },
    {
      "p": "Customers must not use customer-support channels to submit unlawful, abusive, threatening, defamatory, obscene or otherwise inappropriate content."
    },
    {
      "p": "Communications with customer support may be recorded or retained in accordance with applicable law and our Privacy Policy for service, quality, training, dispute-resolution and other legitimate purposes."
    },
    {
      "h2": "18. SHIPPING AND DELIVERY"
    },
    {
      "p": "Orders are generally delivered within 5–7 business days, subject to the destination, courier availability and other operational circumstances."
    },
    {
      "p": "For orders containing multiple products, delivery may take place through multiple shipments."
    },
    {
      "p": "Estimated delivery timelines are indicative and may be affected by circumstances beyond the Company's reasonable control."
    },
    {
      "p": "Where a significant delivery delay occurs, the Company may communicate the reason for the delay and provide available options."
    },
    {
      "p": "An order may be cancelled due to circumstances including:"
    },
    {
      "ul": [
        "Product unavailability;",
        "Incorrect delivery information;",
        "Failure of delivery attempts;",
        "Customer-requested cancellation, where permitted;",
        "Courier restrictions;",
        "Suspected fraudulent activity; or",
        "Other circumstances beyond the Company's reasonable control."
      ]
    },
    {
      "h3": "For further information, please refer to the GlowWithin™ Shipping Policy."
    },
    {
      "h2": "19. ORDER TRACKING"
    },
    {
      "p": "Once an order has been dispatched, tracking information may be provided through email, SMS, WhatsApp or other applicable communication channels."
    },
    {
      "p": "Customers may also track their order through the My Account → Orders section of the Website, where available."
    },
    {
      "h3": "Tracking information may take up to 24 hours after dispatch to become active."
    },
    {
      "h2": "20. RETURNS, REPLACEMENTS AND REFUNDS"
    },
    {
      "p": "Returns and replacements are subject to the GlowWithin™ Returns, Refunds & Cancellations Policy."
    },
    {
      "p": "Due to hygiene and product-safety considerations, certain personal-care products may not be eligible for return once opened or used."
    },
    {
      "p": "Eligible return/replacement situations may include:"
    },
    {
      "ul": [
        "Wrong product delivered;",
        "Expired product delivered;",
        "Damaged product delivered;",
        "Tampered product or packaging;",
        "Missing product;",
        "Incomplete order; or",
        "Other eligible issues specified in the applicable Return Policy."
      ]
    },
    {
      "p": "Customers should retain the original product, packaging, labels and invoice until the issue has been resolved."
    },
    {
      "p": "Please refer to the GlowWithin™ Returns, Refunds & Cancellations Policy for applicable timelines and procedures."
    },
    {
      "h2": "21. DISCLAIMER OF WARRANTIES"
    },
    {
      "p": "To the maximum extent permitted by applicable law, the Website and its content are provided on an “as is” and “as available” basis."
    },
    {
      "p": "Sri Varamaha Wellness does not warrant that:"
    },
    {
      "ul": [
        "The Website will always be available, uninterrupted or error-free;",
        "Website information will always be complete, accurate, current or error-free;",
        "All products will always be available;",
        "Website defects will always be corrected immediately;",
        "Third-party websites linked from the Website will be accurate, secure or available; or",
        "Individual customers will experience specific results from the use of GlowWithin™ products."
      ]
    },
    {
      "p": "Individual results from personal-care products may vary depending on factors including individual skin, scalp, hair and personal-care characteristics, product usage and other circumstances."
    },
    {
      "p": "Nothing on the Website should be interpreted as a guarantee of a particular cosmetic, beauty or personal-care outcome."
    },
    {
      "h2": "22. LIMITATION OF LIABILITY"
    },
    {
      "p": "To the maximum extent permitted by applicable law, Sri Varamaha Wellness (P) Ltd., its affiliates, employees, officers, founders, directors, partners, contractors, licensors and service providers shall not be liable for indirect, incidental, special, consequential or punitive losses arising from or relating to:"
    },
    {
      "ul": [
        "Your use or inability to use the Website;",
        "Website interruptions;",
        "Delays in delivery;",
        "Third-party services;",
        "Payment-service interruptions;",
        "Unauthorised access beyond the Company's reasonable control;",
        "Reliance on Website content;",
        "Product availability;",
        "Events beyond the Company's reasonable control; or",
        "Any other matter arising in connection with your use of the Website or purchase of Products,"
      ]
    },
    {
      "p": "except to the extent that such limitation is prohibited by applicable law."
    },
    {
      "p": "Nothing in these T&C shall exclude or limit liability that cannot lawfully be excluded or limited under applicable law."
    },
    {
      "h2": "23. INDEMNIFICATION"
    },
    {
      "p": "You agree, to the extent permitted by applicable law, to indemnify and hold harmless Sri Varamaha Wellness (P) Ltd., its affiliates, officers, directors, employees, agents, contractors, licensors and service providers from claims, liabilities, damages, losses, costs and reasonable expenses arising from:"
    },
    {
      "ul": [
        "Your breach of these T&C;",
        "Your violation of applicable law;",
        "Your misuse of the Website;",
        "Your infringement of any third-party intellectual property or other rights;",
        "Your User Content; or",
        "Your fraudulent, unlawful or unauthorised use of the Website."
      ]
    },
    {
      "h2": "24. PRIVACY"
    },
    {
      "p": "Sri Varamaha Wellness respects the privacy of its customers."
    },
    {
      "p": "The collection, use, storage, processing and protection of personal information are governed by our Privacy Policy, which forms an integral part of these T&C."
    },
    {
      "p": "Please review the GlowWithin™ Privacy Policy before using the Website or providing personal information."
    },
    {
      "h2": "25. FORCE MAJEURE"
    },
    {
      "p": "Sri Varamaha Wellness shall not be considered in breach of these T&C or liable for any failure, interruption or delay in performing its obligations where such failure or delay results from circumstances beyond its reasonable control."
    },
    {
      "p": "Such circumstances may include, without limitation:"
    },
    {
      "ul": [
        "Natural disasters;",
        "Floods;",
        "Earthquakes;",
        "Fire;",
        "Severe weather;",
        "Epidemics or pandemics;",
        "War;",
        "Terrorism;",
        "Civil unrest;",
        "Government restrictions;",
        "Labour disputes;",
        "Strikes or lockouts;",
        "Supply-chain disruptions;",
        "Transportation disruptions;",
        "Utility or communication failures;",
        "Cyber incidents;",
        "Internet or technology failures;",
        "Acts of governmental or judicial authorities; or",
        "Any other event beyond the Company's reasonable control."
      ]
    },
    {
      "p": "The Company's obligations affected by such circumstances may be suspended for the duration of the relevant event."
    },
    {
      "h2": "26. CESSATION OF OPERATIONS"
    },
    {
      "p": "Sri Varamaha Wellness reserves the right to modify, suspend or discontinue all or part of the Website or any product/service offered through it, temporarily or permanently, with or without notice, subject to applicable law."
    },
    {
      "h2": "27. TERMINATION"
    },
    {
      "p": "The Company may suspend or terminate your access to the Website if it reasonably believes that you have:"
    },
    {
      "ul": [
        "Violated these T&C;",
        "Engaged in fraudulent or abusive activity;",
        "Misused the Website;",
        "Compromised Website security; or",
        "Violated applicable law."
      ]
    },
    {
      "p": "Termination may also result in cancellation of outstanding orders where permitted by law."
    },
    {
      "p": "Provisions relating to intellectual property, privacy, liability, indemnification, governing law and other provisions intended to survive termination shall continue to apply."
    },
    {
      "h2": "28. GOVERNING LAW AND JURISDICTION"
    },
    {
      "h3": "These T&C shall be governed by and interpreted in accordance with the laws of India."
    },
    {
      "p": "Subject to applicable law, courts having appropriate jurisdiction at Hyderabad, Telangana shall have jurisdiction over disputes arising out of or relating to these T&C, the Website or purchases made through the Website."
    },
    {
      "h2": "29. SEVERABILITY"
    },
    {
      "p": "If any provision of these T&C is determined by a competent authority or court to be invalid, unlawful or unenforceable, the remaining provisions shall continue to remain valid and enforceable to the fullest extent permitted by law."
    },
    {
      "h2": "30. WAIVER"
    },
    {
      "p": "Failure by the Company to enforce any provision of these T&C shall not constitute a waiver of its right to enforce that provision in the future."
    },
    {
      "h2": "31. ASSIGNMENT"
    },
    {
      "p": "You may not assign, transfer or otherwise delegate your rights or obligations under these T&C without the Company's prior written consent."
    },
    {
      "p": "The Company may assign or transfer its rights and obligations under these T&C as permitted by applicable law."
    },
    {
      "h2": "32. ENTIRE AGREEMENT"
    },
    {
      "p": "These T&C, together with the applicable Privacy Policy, Shipping Policy, Return & Refund Policy and other policies expressly incorporated into the Website, constitute the agreement between you and Sri Varamaha Wellness (P) Ltd. concerning your use of the Website and purchase of products through it."
    },
    {
      "h2": "33. DOMESTIC USE"
    },
    {
      "p": "The GlowWithin™ Website and Products are primarily intended for customers in India."
    },
    {
      "p": "Customers accessing the Website from outside India do so at their own initiative and are responsible for compliance with applicable local laws."
    },
    {
      "p": "The Company does not represent that the Website or Products are appropriate or available for use in every jurisdiction outside India."
    },
    {
      "h2": "34. CONTACT US"
    },
    {
      "p": "For questions, complaints, order-related concerns, product-related queries or other Website-related matters, please contact:"
    },
    {
      "contact": {
        "org": "Sri Varamaha Wellness (P) Ltd. · Brand: GlowWithin™",
        "rows": [
          [
            "Customer Support Email",
            "feedback@glowwithin.co.in; customercare@glowwithin.co.in"
          ],
          [
            "Customer Support Phone",
            "+91 70757 92176"
          ],
          [
            "Customer Support Hours",
            "Mon–Sat, 9:00 AM – 6:00 PM"
          ]
        ]
      }
    },
    {
      "h2": "35. GRIEVANCE REDRESSAL"
    },
    {
      "p": "In accordance with applicable law, customers may contact the designated Grievance Officer for complaints relating to the Website, products, orders or services."
    },
    {
      "contact": {
        "org": "Grievance Officer",
        "rows": [
          [
            "Email",
            "operationshead@glowwithin.co.in"
          ],
          [
            "Phone",
            "+91 70757 92176"
          ],
          [
            "Working Hours",
            "Mon–Sat, 9:00 AM – 6:00 PM"
          ]
        ]
      }
    },
    {
      "p": "We endeavour to acknowledge and address customer grievances within the timelines prescribed under applicable law."
    },
    {
      "h2": "36. ACCEPTANCE OF TERMS"
    },
    {
      "p": "By accessing, browsing, registering on, using the GlowWithin™ Website or placing an order for GlowWithin™ products, you acknowledge that you have read, understood and agreed to these Terms & Conditions."
    }
  ]
};

