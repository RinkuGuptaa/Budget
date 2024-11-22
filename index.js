// Budget Tracker
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  showChart();
  // Empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // Set Budget
    amount.innerText = tempAmount;
    // Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // Clear Input Box
    totalAmount.value = "";
    // Reset chart data
    resetChartData();
  }
});

// Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  showChart();
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
  showChart();
};

// Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue} $</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

// Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  // Empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  // Enable buttons
  disableButtons(false);
  // Expense
  let expenditure = parseInt(userAmount.value);
  // Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  // Total balance (budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  // Create list
  listCreator(productTitle.value, userAmount.value);
  // Empty inputs
  productTitle.value = "";
  userAmount.value = "";
  // Update chart
  showChart();
});

const mychart = document.getElementById("myChart").getContext("2d");
let chart = new Chart(mychart, {
  type: "bar",
  data: {
    labels: ["Budget", "Expenditure", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [0, 0, 0],
        backgroundColor: ["#2ecc71", "#e74c3c", "#3498db"],
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      },
    ],
  },
  options: {
    legend: { display: true, position: "right", labels: { fontColor: "#000" } },
    layout: { padding: { left: 50, right: 0, bottom: 0, top: 0 } },
    tooltips: { enabled: true },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  },
});

// Function to update the chart data
const updateChartData = (budget, expenditure, balance) => {
  chart.data.datasets[0].data = [budget, expenditure, balance];
  chart.update();
};

// Function to reset the chart data
const resetChartData = () => {
  let budget = parseInt(amount.innerText);
  updateChartData(budget, 0, budget);
};

// Function to update the chart and calculate total expenditure and balance
const showChart = () => {
  let budget = parseInt(amount.innerText);
  let expenditure = parseInt(expenditureValue.innerText);
  let balance = budget - expenditure;
  updateChartData(budget, expenditure, balance);
};

// Call the resetChartData function to set up the initial chart
resetChartData();


// Reminder Tracker
const addReminderBtn = document.getElementById('add-reminder-btn');
const reminderNameInput = document.getElementById('reminder-name');
const reminderDateInput = document.getElementById('reminder-date');
const reminderTimeInput = document.getElementById('reminder-time');
const reminderList = document.getElementById('reminder-list');

addReminderBtn.addEventListener('click', function(event) {
  event.preventDefault();


  const reminder = {
    name: reminderNameInput.value,
    date: reminderDateInput.value,
    time: reminderTimeInput.value
  };


  // Store the reminder in your data structure (e.g., array, localStorage)
  // Display the reminder in the UI or trigger notification here

  // Create a new list item
  const listItem = document.createElement('li');
  listItem.classList.add('reminder-item');

  // Create the reminder content
  const reminderContent = document.createElement('div');
  reminderContent.classList.add('reminder-content');
  reminderContent.innerHTML = `<p class="reminder-name">Description: ${reminder.name}</p><p class="reminder-date">Date: ${reminder.date}</p><p>Time: ${reminder.time}</p>`;

  // Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button', 'fa-solid', 'fa-trash-can');
  deleteButton.style.fontSize = '1.2em';
  deleteButton.addEventListener('click', function() {
    // Handle the delete button click event here
    listItem.remove();
  });

  // Append the reminder content and delete button to the list item
  listItem.appendChild(reminderContent);
  listItem.appendChild(deleteButton);

  // Append the list item to the reminder list
  reminderList.appendChild(listItem);
  
  // Clear the input fields
  reminderNameInput.value = '';
  reminderDateInput.value = '';
  reminderTimeInput.value = '';
});


const hamburger = document.querySelector('.hamburger-menu');
const navLinksHamburger = document.querySelector('.nav-links-hamburger');
const navLinksHamburgerItems = document.querySelectorAll('.nav-links-hamburger li');

hamburger.addEventListener('click', () => {
  navLinksHamburger.classList.toggle('active');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

navLinksHamburgerItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinksHamburger.classList.remove('active');
  });
});





