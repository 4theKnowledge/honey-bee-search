import React from "react";
import '../../stylesheets/App.css';

// https://codesandbox.io/s/flamboyant-frost-hn47k?fontsize=14&file=/src/styles.css
// https://stackoverflow.com/questions/57368134/highlight-part-of-text

function HighlightText ({searchTerm, text}) {

  function createHighlight(text) {
    let split = text.toUpperCase().split(searchTerm.toUpperCase());

    let ttt = "";

    for (let i = 0; i < split.length; i++) {
      if (i === split.length - 1) {
        ttt += split[i];
      } else {
        ttt += `${split[i]}<span class="highlight">${searchTerm}</span>`;
      }
    }

    return ttt;
  }
    return (
        <div
          className="sequenceContainer"
          dangerouslySetInnerHTML={{
            __html: createHighlight(text)
          }}
        />
    );
}

export default HighlightText;
