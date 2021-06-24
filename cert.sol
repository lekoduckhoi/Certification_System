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
    address[] certificateAddresses;
    uint certCounter;
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
        emit Add(_name, _id, _ipfsHash, block.timestamp);
    }
    
    // remove cert for id
    event Remove(uint indexed _id);
    
    function remove(uint _id) public {
        delete idToAddress[_id];
        emit Remove(_id);
    }
    
}

contract Certificate {
    
    // Certificate details;
    string name;
    uint id;
    string ipfsHash;
    uint createdTime;
    address factoryContractAddress;
    // 
    constructor(string memory _name, uint _id, string memory _ipfsHash) {
        name = _name;
        id = _id;
        ipfsHash = _ipfsHash;
        createdTime = block.timestamp;
        factoryContractAddress = msg.sender;
    }
    
    // view details
    function viewName() public view returns(string memory) {
        return name;
    }
    
    function viewId() public view returns(uint) {
        return id;
    }
    
    function viewIpfsHash() public view returns(string memory) {
        return ipfsHash;
    }
    function viewCreatedTime() public view returns(uint) {
        return createdTime;
    }
    function viewFactoryContractAddress() public view returns(address) {
        return factoryContractAddress;
    }
}
