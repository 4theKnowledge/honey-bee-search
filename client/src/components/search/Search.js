import React, { Component } from 'react';
import '../../stylesheets/App.css';
import Axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import Footer from '../Footer';
import Pagination from './Pagination';
import LoadingIndicator from './LoadingIndicator';
import { CSVLink } from 'react-csv';
import ResultModal from './ResultModal';


class Search extends Component {
  state = {
    search: 'QVQHI,QVQHI,QVQHI',
    seq_set: [],
    currentPage: 1,
    resultsPerPage: 10,
    hoveredElement: null,
  };

  componentDidMount = () => {
    console.log('Page loaded...');
  };

  getGeneSeq = () => {
    Axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({ seq_set: data });
    })
    .catch(() => {
      console.log('Error retrieving data!');
    })
  };


  handleChange = ({ target }) => {
    const value = target.value;
    this.setState( { search: value});
  };

  submit = (event) => {
    event.preventDefault(); // stop browser from refreshing

    // Get rid of current sequence set...
    this.setState({ seq_set: []})

    const payload = {
        seqs: this.state.search  // e.g. search bar text
    };

    trackPromise(
      Axios({
        url: '/api/searchresults',
        method: 'post', // axios GET by default
        data: payload
      })
        .then((response) => {
          console.log('Search string has been sent to the server!');
          const data = response.data;
          // console.log('length', data.length);
          this.resetUserInputs();
          this.setState({ seq_set: data });
        })
        .catch(() => {
          console.log('Internal server error');
        })
    );
  };

  resetUserInputs = () => {
    this.setState({
      search: ''
    });
  };

  renderTableHeader = (seqs) => {
    if (!seqs.length) {
      console.log('no seq matched or searched!');
      return null;
    }

    // const header = Object.keys(seqs[0]);
    const header = ["Peptide", "Matches", "Match Names"];
    return header.map((key, index) => {
      return <th key={ index }>{ key } </th>
    });
  };

  // Create matched graphic
  createMatchedGraph = (partialSequence, seqArray) => {
      // Takes in array of sequences (name, description);
      console.log(partialSequence);
      const names = seqArray.map((data) => {
      return <ResultModal
                partialSequence={ partialSequence }
                name={ data.name }
                sequence={ data.sequence }
                description={ data.description}
                setHoverElement={ this.setHoverElement }
                resetHoverElement={this.resetHoverElement}
                hoveredElement={this.state.hoveredElement}
              />
    })
      return <div class="matched-names">{ names }</div>;
  }


  displaySeq = (seqs, indexOfFirstPost, indexOfLastPost) => {
    if (!seqs.length) {
        console.log('no seq matched or searched!');
        return null;
      };

    // Slice data for pagination
    const currentSeqs = seqs.slice(indexOfFirstPost, indexOfLastPost);

    return currentSeqs.map((seq, index) => (
      <tr key={index}>
        <td> <a href="!#" id="table-link-seq-name" target="_blank" rel="noopener noreferrer">{ seq.sequence }</a></td>
        <td>{ seq.matches }</td>
        <td> { this.createMatchedGraph(seq.sequence, seq.names) }</td>
      </tr>
    ));
  };

  // Pagination
  displayPagination = (seqs) => {
    if (!seqs.length) {
      return null;
    }

    return (
      <Pagination
          resultsPerPage={ this.state.resultsPerPage }
          totalResults={ this.state.seq_set.length }
          paginate={ this.paginate }
          currentPage={ this.state.currentPage }/>
    )
  }

  // Change page
  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  // Button hover
  setHoverElement = (name) => {
    this.setState({hoveredElement: name})
  }
  resetHoverElement = () => {
    this.setState({hoveredElement: null});
  }




  render() {

    // Get current results
    const indexOfLastPost = this.state.currentPage * this.state.resultsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.resultsPerPage;

    // console.log(this.state.seq_set);

    // Output for download data
    var downloadArray = [];
    this.state.seq_set.map((sequenceMatch) => (
      
      // console.log(sequenceMatch)
      sequenceMatch.names.map((match) => {
        downloadArray.push([sequenceMatch.sequence,
                            sequenceMatch.matches,
                            match.name,
                            match.description]);
              })
    ));

    let downloadLink;
    if (0 < this.state.seq_set.length) {
      downloadLink = <CSVLink
                        data={downloadArray}
                        filename={"hb_proteome_search_results.csv"}
                        className="btn download-link"
                        target="_blank"
                        id="download-link">
                          Download
                     </CSVLink>
    } else {
      downloadLink = <p></p>
    }

    // JSX
    return (
      <React.Fragment>
        <div className="Search">
            <div className="wrapper">
              <input
                type="text"
                className="input"
                placeholder="Enter peptide sequences..."
                onChange= { this.handleChange }
                >
              </input>

              <div className="searchbtn">
                {/* update with on enter key to submit e.g. press enter? */}
              <i className="fas fa-search" onClick={ this.submit }></i> 
              </div>
            </div>
            <small id="searchHelpBlock" class="form-text text-muted">Format: XYZ,ABC,ZZZ</small>
            <p> { 0 < this.state.seq_set.length ? this.state.seq_set.length + " results returned" : "" }</p>
            <LoadingIndicator />
            <div className="seq-matches">
              { this.displayPagination(this.state.seq_set) }
              <table id="search-results">
              <tbody>
                <tr>{ this.renderTableHeader(this.state.seq_set) }</tr>
              { this.displaySeq(this.state.seq_set, indexOfFirstPost, indexOfLastPost) }
              </tbody>
              </table>
            </div>
            <div id="dowload-button">
              { downloadLink }
            </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Search;