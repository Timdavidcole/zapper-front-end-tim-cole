const memberRowTemplate = document.createElement("template");
memberRowTemplate.innerHTML = `<style>
    .member-row td {
        border-bottom: 2px solid rgba(209, 209, 209, 0.67);
        padding: 20px;
        padding-left: 10px;
        opacity: 1;
        transition: opacity 0.6s linear, background-color 0.6s linear;
    }

    .member-row:hover {
        background-color: #F2F8FF;
    }

    .member-row:hover .member-perms-cell button {
        visibility: visible;
    }

    .member-name-cell {
        width: 25%;
        padding-bottom: 15px ! important;
    }

    .member-email-cell {
        width: 25%
    }

    .member-perms-cell {
        width: 50%
    }

    .profile-pic-container {
        height: 30px;
        width: 30px;
        display: inline-block;
        position: relative;
    }

    .profile-pic {
        background-color: transparent;
        display: inline-block;
        height: 30px;
        width: 30px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 20px;
    }

    .delete-button {
        background-color: transparent;
        float: right;
        position: relative;
        height: 20.5px;
        width: 20.5px;
        top: 3.5px;
        visibility: hidden;
    }

    .delete-button-icon {
        background-color: transparent;
        position: absolute;
        top: 0px;
        left: 0px;
        display: inline-block;
        height: 20px;
        width: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        transform: scale(1, 1);
        transition: transform 0.2s;
        border-radius: 20%
    }

    .delete-button-icon:hover {
        transform: scale(1.2, 1.2);
    }

    .delete-button-icon:active {
    
</style>
<tr class="member-row">
    <td class="member-name-cell">
        <img align="middle" class="profile-pic">
    </td>
    <td class="member-email-cell"></td>
    <td class="member-perms-cell">
        <button class="delete-button">
            <i class="delete-button-icon" style="background-image: url(&quot;./img/bin.png&quot;);"></i>
        </button>
    </td>
</tr>`;

class MemberRow extends HTMLElement {
  constructor() {
    super();
    console.log("constructed!");
    this._member = null;
    // this._shadowRoot = this.attachShadow({ mode: "open" });
    // this._shadowRoot.appendChild(memberRowTemplate.content.cloneNode(true));

    // this.$memberNameCell = this._shadowRoot.querySelector(".member-name-cell");
    // this.$profilePic = this._shadowRoot.querySelector(".profile-pic");
    // this.$memberEmailCell = this._shadowRoot.querySelector(
    //   ".member-email-cell"
    // );
    // this.$memberPermsCell = this._shadowRoot.querySelector(
    //   ".member-perms-cell"
    // );
    // this.$deleteButton = this._shadowRoot.querySelector(".delete-button");
    // this.$deleteButtonIcon = this._shadowRoot.querySelector(
    //   ".delete-button-icon"
    // );
  }

  static get observedAttributes() {
    return ["filter"];
  }

  connectedCallback() {
    console.log("connected!");
    const member = this.getAttribute("filter");
    console.log(member);
  }

  disconnectedCallback() {
    console.log("disconnected!");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
    console.log(newVal);
  }

  adoptedCallback() {
    console.log("adopted!");
  }
}

customElements.define("member-row", MemberRow);
export default MemberRow