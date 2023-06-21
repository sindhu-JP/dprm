const contactSection = {
  type: "contact-selection",
  id: "primaryContactDetails-additional",
  rules: {
    name: "required",
    "last-name": "required",
    "mobile-number": "required",
    email: "required",
    whatsapp: "required",
    "contact-medium": "required",
  },
  fields: [
    {
      label: "Name",
      id: "name",
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      id: "last-name",
      required: true,
    },
    {
      label: "Mobile Number",
      type: "text",
      id: "mobile-number",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      id: "email",
      required: true,
    },
    {
      label: "Whatsapp",
      type: "text",
      id: "whatsapp",
      required: true,
    },
    {
      label: "Contact Medium",
      type: "checkboxes",
      id: "contact-medium",
      required: true,
      span: 12,
      options: [
        {
          label: "Email",
          value: "email",
        },
        {
          label: "SMS",
          value: "sms",
        },
        {
          label: "Whatsapp",
          value: "whatsapp",
        },
        {
          label: "Telegram",
          value: "telegram",
        },
      ],
    },
  ],
};

export default [
  {
    label: "Company Details",
    id: "companyDetails",
    type: "default",
    rules: {
      companyName: "required",
      companyRegistrationNumber: "required|size:10",
      customerCategory: "required",
      customerSubCategory: "required",
      industryType: "required",
      leadClassification: "required",
    },
    fields: [
      {
        label: "Company Name",
        type: "text",
        id: "companyName",
        validation: "required",
        required: true,
      },
      {
        label: "Registration Number",
        type: "text",
        id: "companyRegistrationNumber",
        hook: true,
        hookConfig: {
          type: "validation",
        },
      },
      {
        label: "Customer Category",
        type: "autocomplete",
        id: "customerCategory",
        mapping: "partyType[1].category",
        hook: true,
        hookConfig: {
          type: "substitute-field",
          targetField: "customerSubCategory",
          targetMapping: "subCategory",
        },
        options: [],
      },
      {
        label: "Sub Category",
        type: "autocomplete",
        id: "customerSubCategory",
        options: [],
      },
      {
        label: "Industry Type",
        type: "autocomplete",
        id: "industryType",
        mapping: "industry",
        options: [],
      },
      {
        label: "Lead Classiffication",
        type: "autocomplete",
        id: "leadClassification",
        options: [
          {
            label: "Hot",
            value: "HOT",
          },
          {
            label: "Medium",
            value: "MEDIUM",
          },
          {
            label: "Cold",
            value: "COLD",
          },
        ],
      },
    ],
    optionalFields: [
      {
        label: "Source",
        type: "text",
        id: "industryType",
      },
      {
        label: "Website URL",
        type: "text",
        id: "websiteUrl",
      },
      {
        label: "Number Of Employee",
        id: "numberOfEmployee",
        type: "autocomplete",
        options: [
          {
            label: "< 100",
            value: "<100",
          },
          {
            label: "101 - 500",
            value: "101-500",
          },
          {
            label: "501 - 1000",
            value: "501 - 1000",
          },
        ],
      },
    ],
  },

  {
    label: "Company Address",
    id: "companyAddress",
    type: "default",
    rules: {
      addressLine1: "required",
      city: "required",
      stateOfOrigin: "required",
      country: "required",
      poBox: "required",
      landmark: "required",
    },
    fields: [
      {
        label: "Address Line 1",
        type: "text",
        span: 12,
        id: "addressLine1",
      },
      {
        label: "Country",
        type: "autocomplete",
        id: "country",
        mapping: "country",
        hook: true,
        hookConfig: {
          type: "substitute-field",
          targetField: "stateOfOrigin",
          targetMapping: "province",
        },
        options: [],
      },

      {
        label: "State Of Origin",
        type: "autocomplete",
        id: "stateOfOrigin",
        hook: true,
        hookConfig: {
          type: "substitute-field",
          targetField: "city",
          targetMapping: "city",
        },
        options: [],
      },
      {
        label: "City",
        type: "autocomplete",
        id: "city",
        options: [
          {
            label: "Banglore",
            value: "banglore",
          },
          {
            label: "Delhi",
            value: "delhi",
          },
        ],
      },

      {
        label: "Po Box",
        type: "text",
        id: "poBox",
      },
      {
        label: "landmark",
        type: "text",
        id: "landmark",
      },
    ],
  },

  {
    label: "Primary Contact Details",
    id: "primaryContactDetails",
    type: "default",
    rules: {
      name: "required",
      lastName: "required",
      designation: "required",
      mobileNumber: "required",
      email: "required",
      whatsapp: "required",
      contactmedium: "required",
    },
    fields: [
      {
        label: "Name",
        type: "text",
        id: "name",
      },
      {
        label: "Last Name",
        type: "text",
        id: "lastName",
      },
      {
        label: "Designation",
        type: "autocomplete",
        id: "designation",
        options: [
          {
            label: "Admin",
            value: "admin",
          },
          {
            label: "User",
            value: "user",
          },
        ],
      },
      {
        label: "Mobile Number",
        type: "text",
        id: "mobileNumber",
      },
      {
        label: "Email",
        type: "email",
        id: "email",
      },
      {
        label: "Whatsapp",
        type: "text",
        id: "whatsapp",
      },
      {
        label: "Contact Medium",
        type: "checkboxes",
        id: "contactmedium",
        options: [
          {
            label: "Email",
            value: "email",
          },
          {
            label: "SMS",
            value: "sms",
          },
          {
            label: "Whatsapp",
            value: "whatsapp",
          },
          {
            label: "Telegram",
            value: "telegram",
          },
        ],
      },
    ],
    optionalFields: [
      {
        label: "PHONE NUMBER",
        type: "text",
      },
      {
        label: "EXTENSION NUMBER",
        type: "text",
      },
    ],
  },

  {
    label: "Add Another Contact",
    id: "add-another-contact",
    type: "action",
    action: "add-section",
    actionLabel: "Add",
    section: contactSection,
  },

  {
    label: "Service of Interest",
    id: "extract",
    type: "default",
    rules: {
      serviceType: "required",
    },
    fields: [
      {
        label: "Search Line of bussiness",
        type: "multiselect",
        id: "lob",
        span: 12,
        mapping: "serviceType",
        options: [],
      },
    ],
  },

  {
    label: "Lead Assignment",
    id: "leadAssignment",
    type: "lead-assignment",
    fields: [
      {
        label: "Name",
        type: "text",
        id: "name",
      },
      {
        label: "Email",
        type: "text",
        id: "email",
      },
      {
        label: "Mobile Number",
        type: "text",
        id: "mobileNumber",
      },
    ],
  },

  {
    label: "Referral Information",
    id: "referralInformation",
    type: "default",
    rules: {
      companyName: "required",
      profileManagerName: "required",
      mobileNumber: "required|size:10",
      email: "required|email",
    },
    fields: [
      {
        label: "Company Name",
        type: "autocomplete",
        id: "companyName",
        options: [],
      },
      {
        label: "Profile Manager Name",
        type: "text",
        id: "profileManagerName",
      },
      {
        label: "Mobile Number",
        type: "text",
        id: "mobileNumber",
      },
      {
        label: "Email Id",
        type: "text",
        id: "email",
      },
    ],
  },

  {
    label: "Consumption Patterns",
    type: "default",
    optionalFields: [
      {
        label: "How Minute of Local Calls Per Month ?",
        type: "text",
        id: "minutesOfLocalCallPerMonth",
        span: 6,
      },
      {
        label: "How Many minutes of Offnet Voice Calls Per Month ?",
        type: "text",
        id: "minutesOfOffnetCallsPerMonth",
        span: 6,
      },
      {
        label: "How Many minutes of Inernational Voice Calls Per Month ?",
        type: "text",
        id: "minutesOfInternationVoiceCallsPerMonth",
        span: 6,
      },
      {
        label: "How Active are you in messages ?",
        type: "autocomplete",
        id: "activeMessagesPerMonth",
        span: 6,
        options: [
          {
            label: "Low",
            value: "low",
          },
          {
            label: "Moderate",
            value: "moderate",
          },
          {
            label: "Hight",
            value: "hight",
          },
        ],
      },
      {
        label: "Use Data For",
        type: "checkboxes",
        id: "dateUse",
        span: 12,
        options: [
          {
            label: "Checking Work Emails",
            value: "checkingWorkEmails",
          },
          {
            label: "Checking Personal Emails",
            value: "checkingPersonalEmails",
          },
          {
            label: "online Shopping",
            value: "onlineShopping",
          },
        ],
      },
      {
        label: "Are you a frequent International Traveller ?",
        type: "Switch",
        id: "frequentTraveler",
        span: 12,
        options: [
          {
            label: "",
            value: "frequentTraveler",
          },
        ],
      },
      {
        label: "While Abroad, do you use your phone?",
        type: "Switch",
        span: 12,
        id: "phoneUsedWhileAbroad",
        options: [
          {
            label: "",
            value: "phoneUsedWhileAbroad",
          },
        ],
      },
      {
        label: "How do you prefer to stay in touch while abroad?",
        type: "checkboxes",
        id: "stayTouchWhileAbroad",
        span: 12,
        options: [
          {
            label: "Through calls",
            value: "throughCalls",
          },
          {
            label: "Through messages",
            value: "throughMessages",
          },
          {
            label: "WhatsApp/Facebook/Skype",
            value: "WhatsApp/Facebook/Skype",
          },
        ],
      },
      {
        label: "How important is data connection to you while on roaming ?",
        type: "autocomplete",
        span: 12,
        id: "phoneUsedWhileAbroad",
        options: [
          {
            label: "Low",
            value: "low",
          },
          {
            label: "Moderate",
            value: "moderate",
          },
          {
            label: "Hight",
            value: "high",
          },
        ],
      },
    ],
  },

  {
    label: "Upload Document",
    id: "attachment",
    type: "default",
    fields: [
      {
        label: "Company Registration",
        id: "companyRegistration",
        type: "upload",
        span: 2,
      },
      {
        label: "Chamber of Commerce Certificate",
        id: "chamberOfCommerceCertificate",
        type: "upload",
        span: 2,
      },
      {
        label: "Profile Owner ID Proof",
        id: "profileOwnerIdProfoof",
        type: "upload",
        span: 2,
      },
      {
        label: "Purchase Order",
        id: "purchaseOrder",
        type: "upload",
        span: 2,
      },
    ],
  },
];
