//Import React
import React from 'react'

//Import Redux Components
import { connect } from 'react-redux';

//Import Action
import { qryAccts } from '../actions/index';

class Datatable extends React.Component {
  constructor (props)
  {
    super(props);

    this.state = {
      term : '',
    };

  }

  //Perform Functions when our React Component is about to mount
  componentWillMount()
  {
    this.props.dispatch(qryAccts());
  }

  _onChangeInput(term) {
    if (this.state.timer) {
     clearInterval(this.state.timer);
    }
    var self = this;
    var timer = setTimeout(function(){
      self.setState({term, timer});
    },300);

  }

  _filterAccounts(account) {
     return account.Name.toUpperCase().indexOf(this.state.term.toUpperCase()) > -1;
  }

  render () {
    return (
      <div>
        <div class="slds-form-element">
          <label className="slds-form-element__label">Search Account</label>
          <div className="slds-form-element__control">
            <input  onChange={(event) => this._onChangeInput(event.currentTarget.value)} className="slds-input" placeholder="Search Account"/>
          </div>
        </div>
      <div className="slds-text-heading--medium">Accounts</div>

        <table className="slds-table slds-table--bordered">
          <thead>
            <tr className="slds-text-heading--label">

              <th className="slds-is-sortable" scope="col">
                <div className="slds-truncate"> Name
                </div>
              </th>
              <th className="slds-is-sortable" scope="col">
                <div className="slds-truncate"> Id
                </div>
              </th>
              <th className="slds-is-sortable" scope="col">
                <div className="slds-truncate"> Website
                </div>
              </th>
              <th className="slds-is-sortable" scope="col">
                <div className="slds-truncate"> Owner
                </div>
              </th>
              <th className="slds-cell-shrink"></th>
            </tr>
          </thead>
          <tbody>
           {this.props.accts.filter(this._filterAccounts.bind(this)).map((v,i) =>
             <tr className="slds-hint-parent" key={i}>
               <td className="slds-truncate">
                 {v.Name}
               </td>
               <td className="slds-truncate">
                 {v.Id}
               </td>
               <td className="slds-truncate">
                 {v.Website}
               </td>
               <td className="slds-truncate">
                 {v.Owner.Name}
               </td>
             </tr>
           )}
          </tbody>
        </table>
        <ul>

        </ul>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default connect(state => ({ accts: state.accts }))(Datatable);
