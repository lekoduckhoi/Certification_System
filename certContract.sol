pragma solidity ^0.8.4;

contract Certificate_Factory {
    
    // set owner's address
    address owner;
    uint contractCreateTime;
    constructor() {
        owner = msg.sender;
        contractCreateTime = block.timestamp;
    }
    
    // Program details 
    string name = "BLOCKCHAIN MATHEMATICS AND COMPUTING";
    string host = "VIASM (Vietnam Institute for Advanced Study in Mathematics)";
    
    function viewProgramName() public view returns(string memory) {
        return name;
    }
    
    function viewProgramHost() public view returns(string memory) {
        return host;
    }
    
    function viewProgramHostedTime() public view returns(uint) {
        return contractCreateTime;
    }
    
    // list of cert address
    mapping(address => bool) addressExist;
    address[] certificateAddresses;
    uint certCounter;
    function verifyAddress(address _address) public view returns(bool) {
        return(addressExist[_address]);
    }
    function viewAllCertAddress() public view returns(address[] memory) {
        return certificateAddresses;
    }
    function viewNumberOfCert() public view returns(uint) {
        return certCounter;
    }
    
    // track certificate Address
    mapping (uint => address) idToAddress;
    
    function viewCertAddressById(uint _id) public view returns(address) {
        return idToAddress[_id];
    }
    
    // add new certificate contract
    event Add(string indexed _name, uint indexed _id, string indexed _ipfsHash, uint _time);
    
    function addCertificate(string memory _name, uint _id, string memory _ipfsHash) public {
        require(msg.sender == owner, 'Must be Owner to add new Certificate');
        certCounter++;
        Certificate newCertificate = new Certificate(_name, _id, _ipfsHash);
        idToAddress[_id] = address(newCertificate);
        certificateAddresses.push(address(newCertificate));
        ipfsHashExist[_ipfsHash] = true;
        addressExist[address(newCertificate)] = true;
        emit Add(_name, _id, _ipfsHash, block.timestamp);
    }
    
    // remove cert for id
    event Remove(uint indexed _id);
    
    function remove(uint _id) public {
        require(msg.sender == owner);
        delete idToAddress[_id];
        delete addressExist[viewCertAddressById(_id)];
        emit Remove(_id);
    }
    
    // verify if ipfsHash exist
    mapping(string => bool) ipfsHashExist;
    
    function verify(string memory _ipfsHash) public view returns(bool) {
        return(ipfsHashExist[_ipfsHash]);
    }
    
    function deleteIpfsHash(string memory _ipfsHash) public {
        require(ipfsHashExist[_ipfsHash] == true, "Ipfs doesn't exist");
        require(msg.sender == owner);
        ipfsHashExist[_ipfsHash] = false;
    }
}

contract Certificate {
    // Certificate details;
    event Details(string name, uint id, string ipfsHash, uint createdTime, address factoryContractAddress);

    constructor(string memory _name, uint _id, string memory _ipfsHash) {
        emit Details(_name, _id, _ipfsHash, block.timestamp, msg.sender);
    }
}
