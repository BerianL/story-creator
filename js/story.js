document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    const paragraph = document.querySelector('.hero-content p');
  
    button.addEventListener('click', function () {
      const prompts = [
        'Enter an animal (e.g. elephant):',
        'Enter a time of day (e.g. morning):',
        'Enter a mode of transportation (e.g. hot air balloon):',
        'Enter an adjective (e.g. playful):',
        'Enter an adjective (e.g. colorful):',
        'Enter a place (e.g. forest):',
        'Enter a color (e.g. golden):',
        'Enter a body part (e.g. tail):',
        'Enter an action verb (e.g. dancing):',
        'Enter a number (e.g. three):',
        'Enter a type of food (e.g. berries):',
        'Enter an emotion (e.g. excitement):',
        'Enter a verb (e.g. explore):'
      ];
  
      let userInput = {};
  
      function showPrompt(index) {
        Swal.fire({
          title: prompts[index],
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Next',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            userInput[index] = value.trim() || prompts[index].match(/\(([^)]+)\)/)[1];
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            if (index < prompts.length - 1) {
              showPrompt(index + 1);
            } else {
              // All prompts are completed, use userInput to generate the story
              createStory(userInput);
            }
          }
        });
      }
  
      function createStory(inputData) {
        const story = `Once upon a time, there was a curious ${inputData[0] || 'animal'} who loved to ${inputData[12] || 'explore'} during ${inputData[1] || 'a time of day'}. One day, it decided to take a journey on a ${inputData[2] || 'mode of transportation'}. The ${inputData[3] || 'adjective'} breeze blew through its fur as it traveled across the ${inputData[4] || 'colorful'} landscapes of ${inputData[5] || 'a place'}. The sky above was a brilliant shade of ${inputData[6] || 'color'}, and the ${inputData[7] || 'body part'} of the ${inputData[0] || 'animal'} tingled with ${inputData[11] || 'an emotion'}.
  \<br\>\<br\>
  As it journeyed, the ${inputData[0] || 'animal'} suddenly saw something unexpected: a group of creatures ${inputData[8] || 'action verb'} near a ${inputData[9] || 'number'}-foot tall ${inputData[10] || 'type of food'} tree. Its heart raced with ${inputData[11] || 'an emotion'} as it approached to get a closer look. The creatures noticed the ${inputData[0] || 'animal'} and invited it to join in the festive celebration. Together, they ${inputData[12] || 'action verb'} to the rhythm of the beat, creating memories that would last a lifetime.
  \<br\>\<br\>
  And so, the adventurous ${inputData[0] || 'animal'} learned that even in the most unexpected moments, there are wonderful experiences waiting to be discovered. With a heart full of joy, it continued its journey, ready to embrace whatever wonders the world had to offer.`;

        const storyWithoutEG = story.replace(/(e\.g\.\s*)/gi, ''); // Remove "e.g." from the story
        paragraph.innerHTML = storyWithoutEG;
        button.textContent = 'Start Over';
      }
  
      // Start the prompt loop
      showPrompt(0);
    });
});
