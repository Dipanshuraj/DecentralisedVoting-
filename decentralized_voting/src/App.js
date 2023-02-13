import VotingPlatform from "./abis/VotingPlatform.json";
import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Clock from "./epox.js";

function App() {
  const [account, setAccount] = useState(); // state variable to set account.
  const [contract, setContract] = useState(null);


  const [web3, setWeb3] = useState(undefined);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [Id, setId] = useState("");
  const [id, setid] = useState("");
  const [Optid, setoptid] = useState("");
  const [topic, setTopic] = useState("null");
  const [option, setOption] = useState("");

  const [regid, setregid] = useState("");

  const [Appid, setAppid] = useState("");
  const [appAddress, setAppaddress] = useState("");

  const [voteid, setvoteid] = useState("");
  const [voteOption, setVoteOption] = useState("");

  const [rejctid, setRejctid] = useState("");
  const [rejectAddress, setRejectaddress] = useState("");

  const [countid, setCountid] = useState("");
  const [countOption, setCountOption] = useState("");

  const [voteCount, setVoteCount] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await contract.methods
      .createTopic(Id, name, description, expiryTime)
      .send({ from: account });
    window.alert("New topic created");
    setId("");
    setName("");
    setDescription("");
    setExpiryTime("");
  }

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3(web3);
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      // create a constant js variable networkId which
      //is set to blockchain network id
      const networkId = await web3.eth.net.getId();
      const networkData = VotingPlatform.networks[networkId];
      if (networkData) {
        const abi = VotingPlatform.abi;

        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        setContract(contract);
      } else {
        window.alert("Select Goerli Test Network in your wallet");
      }
    }

    load();
  }, []);

  const handleTopics = async (event) => {
    event.preventDefault();
    const value = await contract.methods.topics(id).call();
    
    console.log(value);
    setTopic(value);
    setid("")
  };

  const handleOption = async (event) => {
    event.preventDefault();
    await contract.methods.addOption(Optid, option).send({ from: account });
    window.alert(option + " " + "option is created for Id:- " + Optid);
    setoptid("");
    setOption("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    await contract.methods.register(regid).send({ from: account });
    window.alert(account + " is registered to " + regid);
    setregid("");
    
  };

  const handleApprove = async (event) => {
    event.preventDefault();
    await contract.methods
      .approveVoter(Appid, appAddress)
      .send({ from: account });
    window.alert(appAddress + " is Approved to Vote ");
    setAppid("");
    setAppaddress("");
  };

  const handleReject = async (event) => {
    event.preventDefault();
    await contract.methods
      .rejectVoter(rejctid, rejectAddress)
      .send({ from: account });
    window.alert(rejectAddress + " is Rejected from Voting ");
    setRejctid("");
    setRejectaddress("");
  };

  const handleVote = async (event) => {
    event.preventDefault();
    await contract.methods.vote(voteid, voteOption).send({ from: account });
    window.alert("Your vote has been recorded");
    setvoteid("");
    setVoteOption("");
  };

  const handleVoteCount = async (event) => {
    event.preventDefault();
    const count = await contract.methods
      .getVoteCount(countid, countOption)
      .call();
    // window.alert("Your vote has been recorded");
    setVoteCount(count);
    setCountid("");
    setCountOption("");
  };

  return (
    <div>
      {account ? (
        <div className="App">
          <h3>Your account is: {account}</h3>
          <Clock />

          <h1 style={{ textAlign: "center", paddingBottom:"2rem", paddingTop:"2rem"}}>Voting Platform</h1>
          <div className="form__container">
            <div className="form__box">
              <h1>Create a new topic</h1>
              
              <form onSubmit={handleSubmit} className="form__create">
                <label>
                  Id:
                  <input
                    type="text"
                    value={Id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Description:
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Expiry Time (Unix timestamp):
                  <input
                    type="text"
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Create Topic</button>
              </form>
              <br />
            </div>

            <div className="form__box">
            <h1>Find Topic Details</h1>
              <form onSubmit={handleTopics}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <button type="submit">Find Topic</button>
              </form>
              <h2>Name of the Topic: {topic.name}</h2>
              <br />
              <h2>Description : {topic.description}</h2>
              <br />
              <h2>Expiry Time (UNIX): {topic.expiryTime}</h2>
            </div>

            <div className="form__box">
              <h1>Add Options to a Topic</h1>
              <form onSubmit={handleOption}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={Optid}
                    onChange={(e) => setoptid(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Option:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Add Option</button>
              </form>
            </div>
            <div className="form__box">
              <h1>Register Yourself</h1>
            <form onSubmit={handleRegister}>
              <label>
                Id:
                <input
                  type="text"
                  value={regid}
                  onChange={(e) => setregid(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Register Yourself</button>
            </form>
            </div>

            <div className="form__box">
              <h1>Approve Wallet</h1>
              <form onSubmit={handleApprove}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={Appid}
                    onChange={(e) => setAppid(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Wallet Address:
                  <input
                    type="text"
                    value={appAddress}
                    onChange={(e) => setAppaddress(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Approve</button>
              </form>
            </div>

            <div className="form__box">
              <h1>Reject Wallet</h1>
              <form onSubmit={handleReject}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={rejctid}
                    onChange={(e) => setRejctid(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Wallet Address:
                  <input
                    type="text"
                    value={rejectAddress}
                    onChange={(e) => setRejectaddress(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Reject</button>
              </form>
            </div>

            <div className="form__box">
              <h1>Submit Your Vote</h1>
              <form onSubmit={handleVote}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={voteid}
                    onChange={(e) => setvoteid(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Option:
                  <input
                    type="text"
                    value={voteOption}
                    onChange={(e) => setVoteOption(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Vote</button>
              </form>
            </div>

            <div className="form__box">
              <h1>See Vote Result</h1>
              <form onSubmit={handleVoteCount}>
                <label>
                  Id:
                  <input
                    type="text"
                    value={countid}
                    onChange={(e) => setCountid(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Option:
                  <input
                    type="text"
                    value={countOption}
                    onChange={(e) => setCountOption(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Vote Count</button>
              </form>
              <h2>Vote Count: {voteCount}</h2>
            </div>
          </div>
        </div>
      ) : (
        // If condition is false, display a warning message
        <h1>Please Install Ethereum Wallet</h1>
      )}
    </div>
  );
}

export default App;
