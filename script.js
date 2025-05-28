// Handles Users, Inventory, and Orders Pages Interactively

document.addEventListener("DOMContentLoaded", function () {
  // User Table Edit/Delete
  const userTable = document.querySelector(".user-table tbody");
  if (userTable) {
    userTable.addEventListener("click", function (e) {
      const target = e.target;
      const row = target.closest("tr");

      if (target.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this user?")) {
          row.remove();
        }
      }

      if (target.classList.contains("edit-btn")) {
        const nameCell = row.children[0];
        const roleCell = row.children[1];
        const emailCell = row.children[2];

        const newName = prompt("Edit name:", nameCell.textContent);
        const newRole = prompt("Edit role:", roleCell.textContent);
        const newEmail = prompt("Edit email:", emailCell.textContent);

        if (newName && newRole && newEmail) {
          nameCell.textContent = newName;
          roleCell.textContent = newRole;
          emailCell.textContent = newEmail;
        } else if (newName !== null && newRole !== null && newEmail !== null) {
          // Only alert if the user didn't cancel
          alert("All fields are required.");
        }
      }
    });
  }

  // Inventory Card Edit/Delete
  const inventorySection = document.querySelector(".inventory-grid");
  if (inventorySection) {
    inventorySection.addEventListener("click", function (e) {
      const target = e.target;
      const card = target.closest(".inventory-card");

      if (!card) return;

      if (
        target.classList.contains("danger") ||
        (target.classList.contains("delete-btn") && target.textContent.trim().toLowerCase() === "delete")
      ) {
        if (confirm("Delete this item?")) {
          card.remove();
        }
      }

      if (
        target.classList.contains("edit-btn") ||
        target.textContent.trim().toLowerCase() === "edit"
      ) {
        const name = card.querySelector("h3");
        const quantity = card.querySelector("p:nth-of-type(1)");
        const location = card.querySelector("p:nth-of-type(2)");

        const newName = prompt("Edit item name:", name.textContent);
        const newQty = prompt(
          "Edit quantity:",
          quantity.textContent.replace(/Quantity:\s*/i, "")
        );
        const newLoc = prompt(
          "Edit location:",
          location.textContent.replace(/Location:\s*/i, "")
        );

        if (newName && newQty && newLoc) {
          name.textContent = newName;
          quantity.textContent = `Quantity: ${newQty}`;
          location.textContent = `Location: ${newLoc}`;
        } else if (newName !== null && newQty !== null && newLoc !== null) {
          // Only alert if the user didn't cancel
          alert("All fields are required.");
        }
      }
    });
  }

  // Orders Table Edit/Delete/View
  const ordersTable = document.querySelector(".orders-table tbody");
  if (ordersTable) {
    ordersTable.addEventListener("click", function (e) {
      const target = e.target;
      const row = target.closest("tr");

      if (!row) return;

      if (
        target.textContent.trim().toLowerCase() === "view" ||
        target.classList.contains("view-btn")
      ) {
        const details = {
          OrderID: row.children[0].textContent,
          Status: row.children[1].textContent,
          Date: row.children[2].textContent,
          Customer: row.children[3].textContent
        };
        alert(
          `Order Details:\n\nOrder ID: ${details.OrderID}\nStatus: ${details.Status}\nDate: ${details.Date}\nCustomer: ${details.Customer}`
        );
      }

      if (
        target.textContent.trim().toLowerCase() === "edit" ||
        target.classList.contains("edit-btn")
      ) {
        const statusCell = row.children[1];
        const currentStatus = statusCell.textContent;
        const newStatus = prompt(
          `Edit Status for ${row.children[0].textContent} (Current: ${currentStatus})\nOptions: Processing, Dispatched, Delivered, Cancelled`,
          currentStatus
        );
        if (
          newStatus &&
          ["Processing", "Dispatched", "Delivered", "Cancelled"].includes(
            newStatus
          )
        ) {
          statusCell.textContent = newStatus;
        } else if (newStatus !== null && newStatus.trim() !== "") {
          alert("Invalid status entered.");
        }
      }

      if (
        target.classList.contains("danger") ||
        (target.classList.contains("delete-btn") && target.textContent.trim().toLowerCase() === "delete")
      ) {
        const orderId = row.children[0].textContent;
        if (
          confirm(
            `Are you sure you want to delete order ${orderId}? This action cannot be undone.`
          )
        ) {
          row.remove();
        }
      }
    });
  }
});

