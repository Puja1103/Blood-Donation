# 🩸 LifeFlow - Blood Donation Coordinator

A complete, modern, attractive, and beginner-friendly **Blood Donation Coordinator Website** built exclusively with **HTML, CSS, and Vanilla JavaScript**.

Designed specifically for college project demonstrations, academic submissions, and front-end portfolio showcases.

---

## 🌟 Project Highlights

- **Pure Client-Side**: No backend servers, no Node.js, no Python, no databases, and zero build tools or dependencies required.
- **Run Anywhere**: Simply double-click `index.html` in any modern web browser.
- **Interactive Chatbot Assistant**: Floating, responsive "Blood Donation Assistant" powered by clean rule-based keyword matching and 1-click quick-reply chips.
- **Local Persistence**: Automatically saves and loads registered donors and blood requests using browser `localStorage`.
- **Preloaded Sample Data**: Comes with realistic sample data pre-seeded so the project looks active and vibrant immediately upon first launch.
- **Safety & Ethics First**: Contains prominent disclaimers on both the website and chatbot stating that real-world blood donations and donor eligibility must always be verified by certified healthcare professionals and authorized blood banks.

---

## 📁 File Structure

As per strict project specifications, this project consists of **ONLY 4 files** with zero subfolders:

```text
Blood Donation/
├── index.html     # Semantic structure, sections, dashboard, forms, compatibility table, and chatbot widget
├── style.css      # Professional red-and-white theme, responsive layouts, badges, and chatbot window styles
├── script.js      # Form validation, search & filter, localStorage management, and chatbot keyword logic
└── README.md      # Comprehensive documentation, setup guide, and presentation notes
```

### Detailed File Descriptions:
1. **`index.html`**:
   - Navigation bar with brand logo and mobile navigation toggle.
   - Awareness hero section highlighting the importance of voluntary blood donation.
   - Interactive coordinator dashboard displaying registered donors, available donors, total requests, and fulfilled requests.
   - Search & filter directory to query donors by blood group, city, and availability.
   - "Register as a Donor" form with validation fields.
   - "Post a Blood Request" form for hospital emergencies and patient requirements.
   - Blood Requests directory with status tabs (All, Pending, Fulfilled).
   - Educational Blood Group Compatibility matrix.
   - Floating Chatbot Assistant widget with title header, rule-based disclaimer, dynamic chat body, quick-reply chips, and message input.
   - Academic demonstration disclaimer and emergency helpline directory.

2. **`style.css`**:
   - Modern color palette featuring deep blood-red (`#d90429`, `#800f2f`), crisp white, and subtle light gray.
   - Responsive CSS Grid and Flexbox layouts optimized for mobile, tablet, and desktop screens.
   - Attractive blood group badges, urgency tags, and status pills.
   - Floating chat toggle button with pulse ring animation, modern chat popup window, chat bubbles, and quick-reply pills.
   - Floating toast notification alerts positioned safely above the chatbot.
   - Zero external CSS libraries or frameworks (no Bootstrap, Tailwind, or FontAwesome needed).

3. **`script.js`**:
   - Reads and writes data directly to the browser's `localStorage` (`lifeflow_donors` and `lifeflow_requests`).
   - Seeds initial sample data on first launch to ensure evaluator-friendly demonstrations.
   - Full client-side validation for donor and patient forms (name length, age bounds, 10-digit mobile numbers, blood group selection).
   - Real-time search and multi-criteria filtering.
   - Interactive actions: Mark request as fulfilled/pending, toggle donor availability, and delete records.
   - Complete Chatbot Assistant engine: window toggle, chat history reset, 5 clickable quick-reply chips, rule-based keyword intent matching (greetings, donor registration, blood requests, blood groups, eligibility, emergency protocol), auto-scroll, and smooth in-page navigation links.
   - Safe HTML escaping to prevent XSS vulnerabilities.

4. **`README.md`**:
   - Project documentation, feature index, chatbot guide, step-by-step test instructions, and viva presentation notes.

---

## 🚀 How to Run the Website

You don't need to install any software, servers, or packages!

1. Open your file explorer and navigate to the project directory:
   ```text
   c:\Users\DELL\Desktop\Blood Donation
   ```
2. Double-click **`index.html`** or right-click `index.html` -> **Open with** -> **Google Chrome / Microsoft Edge / Mozilla Firefox / Brave**.
3. The website will immediately load in your browser, ready to use!

---

## ⚙️ How `localStorage` Works

This application utilizes the browser's native **Web Storage API (`localStorage`)**:
- **Key `lifeflow_donors`**: Stores the JSON-stringified array of all registered blood donors.
- **Key `lifeflow_requests`**: Stores the JSON-stringified array of all blood requests with their status (`pending` or `fulfilled`).

### Key Benefits:
- Data persists across browser refreshes and tab closures.
- Completely private and stays inside the user's computer.
- Requires no internet connection, backend servers, or SQL/NoSQL databases.
- Includes convenient **"Load Sample Demo Data"** and **"Clear All"** buttons in the Dashboard to easily reset or wipe data during viva presentations.

---

## 🧪 Step-by-Step Feature Walkthrough (For Evaluation / Testing)

### 1. View Dashboard Statistics
- Scroll to the **Coordinator Dashboard** to see live counters for:
  - *Registered Donors*
  - *Available Donors*
  - *Total Blood Requests*
  - *Fulfilled Requests*

### 2. Search & Filter Donors
- In the **Find Blood Donors** section:
  - Select a blood group (e.g. `O+` or `A+`).
  - Type a city name (e.g. `Mumbai` or `Pune`).
  - Select availability (`Available Only`).
  - Click **Filter Donors** or observe live results update as you type.
  - Click **Reset** to restore all records.

### 3. Register a New Donor
- Go to the **Register as a Donor** card:
  - Enter full name (e.g., `Anil Kapoor`).
  - Enter age (between `18` and `65`).
  - Select blood group (e.g., `B+`).
  - Enter a valid 10-digit mobile number (e.g., `9876501234`).
  - Enter city (e.g., `Chennai`).
  - Check the health agreement box and click **Complete Donor Registration**.
  - A green toast notification will confirm registration, the dashboard numbers will increment, and the new donor will appear at the top of the donor directory.

### 4. Post a Blood Request
- In the **Post a Blood Request** section:
  - Enter patient name (e.g., `Meera Sen`).
  - Select required blood group (e.g., `O-`).
  - Enter units needed (e.g., `2`).
  - Enter hospital name (e.g., `Global Health City`).
  - Enter city and attendant phone number.
  - Choose urgency level (`Critical`, `Urgent`, or `Standard`).
  - Click **Post Blood Request**.
  - A success toast will appear and the new request will be listed in the **Active Blood Requests** section with a `Pending` status.

### 5. Mark as Fulfilled & Delete Actions
- Under **Active Blood Requests**:
  - Click **✅ Mark as Fulfilled** on any pending request. Notice the status badge switches to `✓ Fulfilled` and the fulfilled count on the dashboard updates.
  - Click **↩️ Mark as Pending** to reopen the request if needed.
  - Click **🗑️ Delete** to remove a record (a confirmation dialog will prevent accidental deletion).

### 6. Toggle Donor Availability
- On any donor card, click **Mark Busy** or **Mark Available** to instantly change their current readiness. Notice how the *Available Donors* counter in the dashboard updates automatically.

### 7. Test the Blood Donation Assistant Chatbot
- Look at the bottom-right corner of the screen and click the floating **💬** chat button.
- The **Blood Donation Assistant** window will open with a welcome greeting:
  > *"Hi! 👋 I am your Blood Donation Assistant. How can I help you today?"*
- Observe the **Assistant Notice** disclaimer banner indicating it is a rule-based helper and not a real AI or medical diagnosis service.
- Try the **Clickable Quick-Reply Buttons**:
  - Click **"How to register as a donor?"** ➔ The assistant explains the registration steps and provides a direct shortcut link to the registration form.
  - Click **"How to request blood?"** ➔ The assistant explains how patients or attendants can post requests.
  - Click **"What are the blood groups?"** ➔ The assistant describes the 8 blood types and universal donors/recipients.
  - Click **"Who can donate blood?"** ➔ The assistant outlines eligibility criteria (age 18–65, weight >= 50kg, donation intervals).
  - Click **"🚨 Emergency blood request"** ➔ The assistant provides immediate emergency numbers (112, 108, 104) and hospital blood bank advice.
- Try **Free Typing**:
  - Type questions like *"hello"*, *"can I donate blood?"*, *"how to find donors"*, or *"emergency"*.
  - Press **Enter** or click the send button **➤** to receive instant answers with conversational message bubbles.
- Click **🔄** in the header to clear conversation history, or click **✕** to minimize the chat window.

---

## 🤖 Chatbot Capabilities & Rule Engine

The assistant uses an internal rule-based keyword engine to deliver immediate, accurate answers without any external APIs:

| Topic / Category | Trigger Keywords | Assistant Response |
| :--- | :--- | :--- |
| **Greetings** | `hi`, `hello`, `hey`, `good morning`, `help` | Welcomes user, introduces capabilities |
| **Donor Registration** | `register`, `become donor`, `join`, `volunteer` | Step-by-step instructions + shortcut link |
| **Blood Request** | `request`, `need blood`, `patient`, `hospital` | Steps to post hospital requirement + shortcut link |
| **Blood Groups** | `blood group`, `types`, `universal`, `O-`, `AB+` | Overview of all 8 blood groups & compatibility |
| **Donation Eligibility** | `who can donate`, `eligible`, `criteria`, `age`, `weight` | Age, weight, hemoglobin & health guidelines |
| **Emergency SOS** | `emergency`, `urgent`, `critical`, `immediate`, `icu` | Critical notice, 112/108/104 helplines |
| **Search Directory** | `search`, `find`, `city`, `available` | How to use search filters + shortcut link |
| **Gratitude / Close** | `thank you`, `thanks`, `great`, `bye` | Encouraging lifesaver closing message |
| **Unrecognized Queries** | Any unmapped keyword | Helpful fallback suggestions & topic list |

---

## 🔒 Form Validation Rules

| Field | Rule | Error Feedback |
| :--- | :--- | :--- |
| **Full Name / Patient Name** | Minimum 2 characters | Inline red warning under input field |
| **Age** | Number between 18 and 65 | Must be between 18 to 65 years old |
| **Blood Group** | Required selection from dropdown | Please select a blood group |
| **Phone Number** | Exactly 10 numeric digits | Must enter a valid 10-digit mobile number |
| **City / Hospital** | Minimum 2 characters | Field required |
| **Health Consent** | Checkbox must be checked | Agreement required before submission |

---

## ⚠️ Important Disclaimer

> **Demonstration Project Notice:**  
> This website is created as an academic, front-end educational demonstration project. It is intended to showcase UI/UX design, form handling, and browser-based state management.
> 
> In actual clinical scenarios, donor eligibility, infectious disease testing, blood grouping, cross-matching, and availability **must always be verified through authorized blood banks, registered hospitals, or qualified medical professionals**. Never rely on unverified community listings for life-critical medical procedures. In an emergency, dial your national emergency number (e.g., 104, 108, 112, or 911).

---

## 🎓 College Viva & Project Presentation Tips

When presenting this project to professors, examiners, or project guides, you can highlight:

1. **Architecture**: Clean separation of concerns between structure (`index.html`), presentation (`style.css`), and behavior (`script.js`).
2. **Zero Dependencies**: Zero reliance on external CDNs or npm packages ensures 100% offline functionality.
3. **Responsive Design**: Designed with modern CSS Flexbox and Grid, completely usable on smartphones, tablets, and desktop displays.
4. **Local State Management**: Uses structured JSON storage in `localStorage` to simulate a lightweight database without requiring backend overhead.
5. **UI/UX Polish**: Includes toast alerts, form error states, smooth scrolling, and hover animations for an appealing user experience.
6. **Built-in Assistant Chatbot**: Implements a client-side conversational interface demonstrating state handling, DOM manipulation, keyword extraction, and ethical safety boundaries without requiring expensive AI APIs.

