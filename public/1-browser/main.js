(function () {
  const $button = document.getElementById('button-generate');
  const $output = document.getElementById('output');

  $button.addEventListener('click', () => {
    $output.innerHTML = '';

    const numbers = generateRandomNumbers(20, 0, 100);
    const sortedNumbers = sortNumbers(numbers);

    $output.innerHTML = template(sortedNumbers);
  });

  function template(numbers) {
    return `
      <div class="list-container">
        <div class="even-numbers-container">
          <h2 class="title">Even numbers (${numbers.even.length})</h2>
          <ul class="even-numbers">
            ${numbers.even
              .map((number) => `<li class="item">${number}</li>`)
              .join('')}
          </ul>
        </div>

        <div class="odd-numbers-container">
          <h2 class="title">Odd numbers (${numbers.odd.length})</h2>
          <ul class="odd-numbers">
            ${numbers.odd
              .map((number) => `<li class="item">${number}</li>`)
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }

  /**
   * Generates n random numbers between min and max.
   *
   * @param {number} n
   * @param {number} min
   * @param {number} max
   * @returns {number[]}
   */
  function generateRandomNumbers(n, min, max) {
    const numbersArray = [];

    for (let i = 0; i < n; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbersArray.push(randomNumber);
    }

    return numbersArray;
  }

  /**
   * Sorts an array of numbers to odd and even numbers by ascending order.
   *
   * @param {number[]} numbers
   * @return {{even: number[], odd: number[]}}
   */
  function sortNumbers(numbers) {
    const evenNumbers = [];
    const oddNumbers = [];

    // Get even and odd numbers
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
      } else {
        oddNumbers.push(numbers[i]);
      }
    }

    evenNumbers.sort(sortAscending);
    oddNumbers.sort(sortAscending);

    return {
      even: evenNumbers,
      odd: oddNumbers,
    };

    // Helpers
    // ================================================================

    /**
     * Sorts an array of numbers by ascending order.
     *
     * @param a {number}
     * @param b {number}
     * @return {number}
     */
    function sortAscending(a, b) {
      return a - b;
    }
  }
})();
