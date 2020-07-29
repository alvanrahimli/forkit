let Option = class {
    constructor(optionText, videoSource) {
      this.source = videoSource;
      this.text = optionText;
    }
  };

let Question = class {
    constructor(qId, qVid, qTime, qText, qOpts) {
        this.id = qId;
        this.video = qVid;
        this.time = qTime;
        this.text = qText;
        this.options = qOpts;
    }
}

function getQuestions(data) {
  let lines = data.split('\n')
  let questionCount = lines[0].split(':')[1];

  let questions = [];
  for (let i = 0; i < questionCount; i++) {
      // Read question data
      let questionLine = lines.filter((line) => line.includes("#question"))[i];
      let questionId = questionLine.split(':')[0].split('-')[1];
      let questionText = questionLine.split(':')[1];
      let questionTime = lines.filter((l) => l.includes("#" + questionId + "-time"))[0].split(':')[1];
      let questionVideo = lines.filter((l) => l.includes("#" + questionId + "-vid"))[0].split(':')[1];

      let options = [];
      let optionTextLines = lines.filter((l) => l.includes("#q" + i + "-opt-text"));
      for (let j = 0; j < optionTextLines.length; j++) {
          // Read options
          const optLine = optionTextLines[j];
          let oText = optLine.split(':')[1];
          let srcLine = lines.filter((l) => l.includes("#q" + i + "-opt-src-" + j))[0];
          let oSrc = srcLine.split(':')[1];

          options.push(new Option(oText, oSrc));
      }

      questions.push(new Question(questionId, questionVideo, questionTime, questionText, options));
  }

  return questions;
}

function getInitialVideo(data) {
  let lines = data.split('\n');
  let initLine = lines.find((l) => l.includes("#init"));
  let initVideo = initLine.split(':')[1];
  return initVideo;
}