import React from 'react';

const markdown = `# KATA - DISTRIBUTED DEVELOPER - Online Bookstore

This is a simple code kata that involves creating a basic front-end in **React** and a back-end using a **RESTful API**. We will create a simple **Online Bookstore**.

The application will:

- Display a list of books.
- Allow users to add books to their cart.
- Allow users to view and modify the cart (change quantity or remove items).

The system will consist of:

- A **React front-end** for the user interface.
- A **Spring Boot back-end** for handling API requests.

> 🧪 Take **TDD (Test Driven Development)** into consideration.

---

## ✅ Requirements

### 📘 Frontend (React)

1. Create a React application for an online bookstore.
2. Display a list of books with their **titles**, **authors**, and **prices**.
3. Implement a **shopping cart** feature that allows users to **add books** to their cart.
4. Display the **contents of the shopping cart** with the ability to **modify quantities** and **remove items**.
5. Implement a **simple checkout process** that shows a summary of the order.

### ⚙️ Backend (Spring Boot)

1. Create a **RESTful API** using **Spring Boot** and **Java 8 or 17** to handle book-related operations.
2. Implement endpoints for retrieving the list of available books.
3. Store book data in a **database** (e.g., **H2** or **MySQL**).
4. Create endpoints for managing the **shopping cart** and **processing orders**.
5. Handle basic **user authentication** (login and registration).

---

## 📋 General Instructions

1. Front-end and back-end should be in **separate folders or repositories**.
2. Ensure that the **front-end can make API requests** to the back-end.
3. Implement **error handling and validation** on both the front-end and back-end.
4. Use appropriate **HTTP status codes** for API responses (e.g., \`200\`, \`201\`, \`400\`, \`404\`).
5. Include a **README file** in each repo with the steps to run the application.

---

Happy coding! 🚀
`;

function parseMarkdown(md) {
  // Simple markdown to JSX for demo (headings, lists, paragraphs)
  return md.split('\n').map((line, idx) => {
    if (line.startsWith('# ')) return <h1 key={idx}>{line.replace('# ', '')}</h1>;
    if (line.startsWith('## ')) return <h2 key={idx}>{line.replace('## ', '')}</h2>;
    if (line.startsWith('- ')) return <li key={idx}>{line.replace('- ', '')}</li>;
    if (line.trim() === '') return null;
    return <p key={idx}>{line}</p>;
  });
}

const InfoPage = () => (
  <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2.5rem' }}>
    {parseMarkdown(markdown)}
  </div>
);

export default InfoPage;
