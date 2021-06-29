pragma solidity ^0.8.4;

contract Certificate_Factory {
    
    // set owner's address
    address owner;
    uint contractCreateTime;
    
    // Issuer
    mapping(address => bool) isIssuer;
    
    // list of cert address
    mapping(address => bool) addressExist;
    address[] certificateAddresses;
    uint certCounter;
    
    // track certificate Address
    mapping (string => address) idToAddress;
    mapping (string => string) idToIpfs;
    
    // verify if ipfsHash exist
    mapping(string => bool) ipfsHashExist;
    
    // events
    event Add(string indexed _name, string indexed _id, string indexed _ipfsHash, uint _time);
    event Remove(string indexed _id);
    
    constructor() {
        owner = msg.sender;
        contractCreateTime = block.timestamp;
    }
    
    // Program details 
    string private name = "BLOCKCHAIN MATHEMATICS AND COMPUTING (25-27/6/2021, 3-4/7/2021)";
    string private host = "VIASM (Vietnam Institute for Advanced Study in Mathematics)";

    function viewProgramName() public view returns(string memory) {
        return name;
    }
    function viewProgramHost() public view returns(string memory) {
        return host;
    }
    function viewProgramCreationTime() public view returns(uint) {
        return contractCreateTime;
    }
    function viewAllCertAddresses() public view returns(address[] memory) {
        return certificateAddresses;
    }
    function viewNumberOfCertificates() public view returns(uint) {
        return certCounter;
    }
    function viewCertAddressById(string memory _id) public view returns(address) {
        return idToAddress[_id];
    }
    function verifyAddress(address _address) public view returns(bool) {
        return(addressExist[_address]);
    }
    function verifyIpfsHash(string memory _ipfsHash) public view returns(bool) {
        return(ipfsHashExist[_ipfsHash]);
    }
    //set, remove issuer function
    function AddIssuer(address _newIssuer) public {
        require(msg.sender == owner || isIssuer[msg.sender] == true, "Must be owner or Issuer");
        isIssuer[_newIssuer] = true;
    }
    
    function addCertificate(string memory _name, string memory _id, string memory _ipfsHash) public {
        require(msg.sender == owner || isIssuer[msg.sender] == true, "Must be owner or Issuer");
        certCounter++;
        Certificate newCertificate = new Certificate(_name, _id, _ipfsHash);
        idToAddress[_id] = address(newCertificate);
        idToIpfs[_id]= _ipfsHash;
        certificateAddresses.push(address(newCertificate));
        ipfsHashExist[_ipfsHash] = true;
        addressExist[address(newCertificate)] = true;
        
        emit Add(_name, _id, _ipfsHash, block.timestamp);
    }
    
    function remove(string memory _id) private {
        require(msg.sender == owner || isIssuer[msg.sender] == true, "Must be owner or Issuer");
        certCounter--;
        delete idToAddress[_id];
        delete addressExist[viewCertAddressById(_id)];
        delete idToIpfs[_id];
        delete ipfsHashExist[idToIpfs[_id]];
        emit Remove(_id);
    }
}

contract Certificate {
    // Certificate details;
    event Details(string name, string id, string ipfsHash, uint createdTime, address factoryContractAddress);

    constructor(string memory _name, string memory _id, string memory _ipfsHash) {
        emit Details(_name, _id, _ipfsHash, block.timestamp, msg.sender);
    }
}
