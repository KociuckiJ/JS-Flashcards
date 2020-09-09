//Event Listeners
function eventListeners() {
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  let data = [];
  let id = 1;

  //New UI Instance
  const ui = new UI();

  //Show Question Form
  showBtn.addEventListener("click", function () {
    ui.showQuestion(questionCard);
  });

  //Hide Question Form
  closeBtn.addEventListener("click", function () {
    ui.hideQuestion(questionCard);
  });

  //Add Question
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    if (questionValue === "" || answerValue === "") {
      feedback.classList.add("showItem", "alert-danger");
      feedback.textContent = "Cannot add empty values!";

      setTimeout(function () {
        feedback.classList.remove("alert-danger", "showItem");
      }, 3000);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      ui.addQuestion(questionList, question);
      ui.clearFields(questionInput, answerInput);
    }
  });

  //Work with a Question
  questionList.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.classList.contains("delete-flashcard")) {
      let id = event.target.dataset.id;

      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      //Rest of the Data
      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });
      data = tempData;
    } else if (event.target.classList.contains("show-answer")) {
      event.target.nextElementSibling.classList.toggle("showItem");
    } else if (event.target.classList.contains("edit-flashcard")) {
      //Delete Question
      let id = event.target.dataset.id;

      //Delete Question from the DOM
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );

      //Show the Question Card
      ui.showQuestion(questionCard);

      //Specific Question
      const tempQuestion = data.filter(function (item) {
        return item.id === parseInt(id);
      });

      //Rest of the Data
      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });

      data = tempData;
      questionInput.value = tempQuestion[0].title;
      answerInput.value = tempQuestion[0].answer;
    }
  });
}

//UI Constructor Function
function UI() {}

//Show Question Card
UI.prototype.showQuestion = function (element) {
  element.classList.add("showItem");
};

//Hide Question Card
UI.prototype.hideQuestion = function (element) {
  element.classList.remove("showItem");
};

//Add Question
UI.prototype.addQuestion = function (element, question) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `<div class="card card-body flashcard my-3">
     <h4 class="text-capitalize">${question.title}</h4>
     <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
     <h5 class="answer mb-3">${question.answer}</h5>
     <div class="flashcard-btn d-flex justify-content-between">

      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
     </div>
    </div>`;
  element.appendChild(div);
};

//Clearing Fields
UI.prototype.clearFields = function (question, answer) {
  question.value = "";
  answer.value = "";
};

//Question Constructor Function
function Question(id, title, answer) {
  this.id = id;
  this.title = title;
  this.answer = answer;
}

//DOM Event Listener
document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
