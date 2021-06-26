let selected = document.querySelector('.selected')
let cert = document.getElementById('certification')
let verify = document.getElementById('verify')
let cert_found = document.getElementById('cert__found')
let checked__wrong = document.querySelector('.checked__wrong')
let checked__right = document.querySelector('.checked__right')
let text_right = document.querySelector('.verify__text__right')
let text_wrong = document.querySelector('.verify__text__wrong')
function transformx(i){
  selected.style.left = selected.style.left === '50%' ? '' :'50%'
  if(i===1){
    verify.classList.add('hidden')
    cert.classList.remove('hidden')
    checked__right.classList.add('hidden')
    checked__wrong.classList.add('hidden')
    text_right.classList.add('hidden')
    text_wrong.classList.add('hidden')
  }
  if(i===2){
    verify.classList.remove('hidden')
    cert.classList.add('hidden')
    cert_found.classList.add('hidden')
  }
}
let img = document.querySelector('.verify__left__uploadbox__image')
let myFile = document.getElementById('myFile')
let text = document.querySelector('.verify__left__uploadbox__text')
myFile.onchange = (e)=>{
  const [file] = myFile.files
  if(file){
    img.src = URL.createObjectURL(file)
    img.classList.remove('hidden')
    img.onload = function(){
      URL.revokeObjectURL(img.src)
    }
    myFile.classList.add('hidden')
    text.classList.add('hidden')
  }
}

const web3 = new Web3('https://ropsten.infura.io/v3/d92fd0d900fc4b85bf4090eb5478ba41')

const certFacABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "Remove",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "deleteIpfsHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "remove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "verifyAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllCertAddress",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "viewCertAddressById",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewNumberOfCert",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewProgramHost",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewProgramHostedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewProgramName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const certFacAddress = "0x74D9BAe0830d0c03041622d6F85EeF3dEf0c5dFd"
const certFacContract = new web3.eth.Contract(certFacABI, certFacAddress)

const certABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "viewCreatedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewFactoryContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewIpfsHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
var certAddress


let submit = document.getElementById('submit')
let link_downloadable = document.getElementById('link__downloadable')
submit.addEventListener('click',()=>{
  let address = $("#input").val()
  console.log(address)
  console.log(typeof(address))
  if(!web3.utils.isAddress(address)) {
    alert("Please enter a valid address")
  } else {
    cert_found.classList.remove('hidden')
    certFacContract.methods.verifyAddress(address).call((err, result) => {
      if(result == 0) {
        cert_found.classList.remove('hidden')
        link_downloadable.innerHTML = "No link found"
        $("#certImg").attr("src", "./image/defaultCert.jpg")
      }  else {
        $("#abcd").html("CERTIFICATE DETAILS")
        $("#issuedBy").html("Issued By: Vietnam Institute for Advanced Study in Mathematics (VIASM).")
        $("#course").html("Course: BLOCKCHAIN MATHEMATICS AND COMPUTING")
        $("#date").html("Date: 04/07/2021")

        certAddress = address
        var certContract = new web3.eth.Contract(certABI, certAddress)
        certContract.methods.viewCreatedTime().call().then(console.log)
        certContract.methods.viewName().call((err, result) => {
          $("#issuedTo").html("Issued To: " + result)
        })
        certContract.methods.viewIpfsHash().call((err, res) => {
          $("#link__downloadable").attr("href","https://gateway.pinata.cloud/ipfs/"+res)
          $("#link__downloadable").html("https://gateway.pinata.cloud/ipfs/"+res)
          $("#certImg").attr("src", "https://gateway.pinata.cloud/ipfs/"+res)
        })
      }
    })
  }
})

// verify part
let verify_button = document.getElementById('verify__button')
let check = false // sửa dòng này
    var file;
    var inpFile = document.getElementById("myFile");
    $("#verify__button").click(function() {
      var cid
      file = inpFile.files[0]
      if (file == undefined) {
            alert("Please chose an image")
        } else {
            let data = new FormData();
            data.append('file', file);
            //pin to take cid
            axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
                    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        pinata_api_key: "fe8a1f46de05dcc4ad7e",
                        pinata_secret_api_key: "3ae4d4e22fa0121975850eb3234a9e212e532e6d5e6e8ff544fa371e33af3fd2"
                    }
                })
            .then(function (response) {
              cid = response.data.IpfsHash;
              console.log(cid);
              certFacContract.methods.verify(cid).call((err, res1) => {
                if(/* Nếu verify thành công thì hiện dấu tick v xanh */res1 === true){
                  checked__right.classList.remove('hidden')
                  text_right.classList.remove('hidden')
                }
                else { /* Nếu verify ko thành công thì hiện dấu tick đỏ và unpin ảnh vừa pin*/
                  checked__wrong.classList.remove('hidden')
                  text_wrong.classList.remove('hidden')
                  //unpin
                  const url = "https://api.pinata.cloud/pinning/unpin/"+ cid;
                  axios.delete(url, {
                  headers: {
                    pinata_api_key: "fe8a1f46de05dcc4ad7e",
                    pinata_secret_api_key: "3ae4d4e22fa0121975850eb3234a9e212e532e6d5e6e8ff544fa371e33af3fd2"
                    }
                  })
                  .then(function (res) {
                    console.log(res)
                  })
                  .catch(function (error) {
                    alert("cant unpin")
                  })
                }
              })
            })
            .catch(function (error) {
                alert("cant pin")
            });
        }
    });   
