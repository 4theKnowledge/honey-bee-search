import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import Footer from './Footer';
import Pagination from './Pagination';
import LoadingIndicator from './LoadingIndicator';
import { CSVLink } from 'react-csv';


class Search extends Component {

  state = {
    search: '',
    seq_set: [],
    currentPage: 1,
    resultsPerPage: 10
  };

  componentDidMount = () => {
    console.log('Page loaded...');
  };

  getGeneSeq = () => {
    Axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({ seq_set: data });
      console.log('Data has been received!');
      console.log(this.state.seq_set)
    })
    .catch(() => {
      console.log('Error retrieving data!');
    })
  };


  handleChange = ({ target }) => {
    const value = target.value;
    this.setState( { search: value});
  };


  // this will be the event that is passed to mongodb to retrieve seqs
  submit = (event) => {
    event.preventDefault(); // stop browser from refreshing

    const payload = {
        seq: this.state.search  // e.g. search bar text
    };

    trackPromise(
      Axios({
        url: '/api/getseq',
        method: 'post', // axios GET by default
        data: payload
      })
        .then((response) => {
          console.log('Data has been sent to the server');
          const data = response.data;
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
    const header = ["Peptide", "Description", "Sequence"];
    return header.map((key, index) => {
      return <th key={ index }>{ key } </th>
    });
  };

  // Truncate Sequence... TODO: add hover over
  truncate = (seq) => {
    return seq.length > 20 ? seq.substring(0, 15) + "..." : seq;
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
        <td> <a href="!#" id="table-link-seq-name" target="_blank" rel="noopener noreferrer">{ seq.name }</a></td>
        <td> { seq.description }</td>
        <td> { this.truncate(seq.sequence) }</td>
      </tr>
    ));
  };


  // Pagination
  displayPagination = (seqs) => {
    if (!seqs.length) {
      return null;
    }

    return (
      <Pagination resultsPerPage={ this.state.resultsPerPage } totalResults={ this.state.seq_set.length } paginate={ this.paginate }/>
    )
  }

  // Change page
  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})

  } 

  render() {

    // Get current results
    const indexOfLastPost = this.state.currentPage * this.state.resultsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.resultsPerPage;

    // Output for download data

    console.log(Object.keys(this.state.seq_set))

    var downloadArray = [];

    this.state.seq_set.map((seq) => (
      downloadArray.push([seq.name, seq.description, seq.sequence])
    ));

    console.log(downloadArray);
    
    
    // const csvContent = "data:text/csv;charset=utf-8," + downloadArray.map(e => e.join(",")).join("\n");
    // var encodedUri = encodeURI(csvContent);
    
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "honey_bee_proteome_search_results.csv");
    // document.body.appendChild(link);
    let downloadLink;
    if (0 < this.state.seq_set.length) {
      console.log('set GT 0')
      downloadLink = <CSVLink data= {downloadArray} filename={"hb_proteome_search_results.csv"} className="btn download-link" target="_blank" id="download-link">Download</CSVLink>
    } else {
      console.log('set LT 0')
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
                placeholder="Enter proteome sequence..."
                // value={this.state.search}
                onChange= { this.handleChange }
                >
              </input>
              <div className="searchbtn">
                {/* update with on enter key to submit? */}
              <i className="fas fa-search" onClick={this.submit}></i> 
            </div>
            </div>
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