let selected = document.querySelector('.selected')
let cert = document.getElementById('certification')
let verify = document.getElementById('verify')
let cert_found = document.getElementById('cert__found')
let checked__wrong = document.querySelector('.checked__wrong')
let checked__right = document.querySelector('.checked__right')
let text_right = document.querySelector('.verify__text__right')
let text_wrong = document.querySelector('.verify__text__wrong')
$("#load").hide();
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
    //myFile.classList.add('hidden')
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
				"internalType": "string",
				"name": "_id",
				"type": "string"
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
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "Remove",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newIssuer",
				"type": "address"
			}
		],
		"name": "AddIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "verifyIpfsHash",
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
		"name": "viewAllCertAddresses",
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
				"internalType": "string",
				"name": "_id",
				"type": "string"
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
		"name": "viewNumberOfCertificates",
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
		"name": "viewProgramCreationTime",
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
const certFacAddress = "0xA73E9a3EdDDb3A0D207e24bE47cc299f21e3cc41"
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
				"internalType": "string",
				"name": "_id",
				"type": "string"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "createdTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "factoryContractAddress",
				"type": "address"
			}
		],
		"name": "Details",
		"type": "event"
	}
]
var certAddress

let submit = document.getElementById('submit')
let link_downloadable = document.getElementById('link__downloadable')
submit.addEventListener('click',()=>{
	cert_found.classList.add('hidden')
	let address = $("#input").val()
  if(!web3.utils.isAddress(address)) {
	certFacContract.methods.viewCertAddressById(SHA1(address)).call((err, res2) => {
		if(res2 == "0x0000000000000000000000000000000000000000"){
			alert("Please enter a valid citizen identification number")
		} else {
			cert_found.classList.remove('hidden')
			$("#certImg").attr("src", "./image/loadd.gif")
			$("#abcd").html("CERTIFICATE DETAILS")
			$("#issuedBy").html("Issued By: Vietnam Institute for Advanced Study in Mathematics (VIASM).")
			$("#course").html("Course: BLOCKCHAIN MATHEMATICS AND COMPUTING")
			$("#bcaddress").html("Blockchain Address: " + res2)

			certAddress = res2
			var certContract = new web3.eth.Contract(certABI, certAddress)
			certContract.getPastEvents(
				'Details',
				{ 
					fromBlock: 10520249,
					toBlock: 'latest'
				},
				(err, result) => { 
					console.log(result)
					$("#idhash").html("Recipient ID hash: " + result[0].returnValues.id)
					$("#issuedTo").html("Issued To: " + result[0].returnValues.name)
					$("#link__downloadable").attr("href","https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
			 	  	$("#link__downloadable").html("https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
				    $("#certImg").attr("src", "https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
				}
			)
		}
	})
  } else {
    $("#certImg").attr("src", "./image/loadd.gif")
	cert_found.classList.remove('hidden')
    certFacContract.methods.verifyAddress(address).call((err, result) => {
      if(result == false) {
        cert_found.classList.remove('hidden')
        link_downloadable.innerHTML = "No link found"
        $("#certImg").attr("src", "./image/defaultCert.jpg")
      }  else {
		console.log(address)
		$("#abcd").html("CERTIFICATE DETAILS")
        $("#issuedBy").html("Issued by: Vietnam Institute for Advanced Study in Mathematics (VIASM)")
        $("#course").html("Course: BLOCKCHAIN MATHEMATICS AND COMPUTING")
        $("#bcaddress").html("Blockchain Address: " + address)
        
		certAddress = address
        var certContract = new web3.eth.Contract(certABI, certAddress)
        certContract.getPastEvents(
			'Details',
			{ 
				fromBlock: 10520249,
				toBlock: 'latest'
			},
			(err, result) => { 
				$("#issuedTo").html("Issued to: " + result[0].returnValues.name)
				$("#idhash").html("Recipient ID hash: " + result[0].returnValues.id)
				$("#link__downloadable").attr("href","https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
         	  	$("#link__downloadable").html("https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
        	    $("#certImg").attr("src", "https://gateway.pinata.cloud/ipfs/"+result[0].returnValues.ipfsHash)
			}
		)
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
      $("#load").show()
      var cid
      file = inpFile.files[0]
      if (file == undefined) {
            alert("Please chose an image")
			$("#load").hide();
        } else {
            	checked__right.classList.add('hidden')
                  text_right.classList.add('hidden')
				  checked__wrong.classList.add('hidden')
                  text_wrong.classList.add('hidden')
			let data = new FormData();
            data.append('file', file);
            //pin to take cid
            axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
                    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        pinata_api_key: "50f2427237e2ba6f5487",
                        pinata_secret_api_key: "e7b44cb55ec2ac21e8b60e10b3ae1edfb2e2bc850e07d573df2e6b48b4bf95bb"
                    }
                })
            .then(function (response) {
              cid = response.data.IpfsHash;
              certFacContract.methods.verifyIpfsHash(cid).call((err, res1) => {
                if(/* Nếu verify thành công thì hiện dấu tick v xanh */res1 === true){
				  $("#load").hide();
				  checked__right.classList.remove('hidden')
                  text_right.classList.remove('hidden')
                }
                else { /* Nếu verify ko thành công thì hiện dấu tick đỏ và unpin ảnh vừa pin*/
					$("#load").hide();
				  checked__wrong.classList.remove('hidden')
                  text_wrong.classList.remove('hidden')
                  //unpin
                  const url = "https://api.pinata.cloud/pinning/unpin/"+ cid;
                  axios.delete(url, {
                  headers: {
                    pinata_api_key: "50f2427237e2ba6f5487",
                    pinata_secret_api_key: "e7b44cb55ec2ac21e8b60e10b3ae1edfb2e2bc850e07d573df2e6b48b4bf95bb"
                    }
                  })
                  .then(function (res) {
					  console.log("unpin successfully")
                  })
                  .catch(function (error) {
					alert("cant unpin")
					$("#load").hide();
                  })
                }
              })
            })
            .catch(function (error) {
                console.log(error)
				alert("cant pin")
				$("#load").hide();
            });
        }
    });   

// SHA1 function
function SHA1(msg){function rotate_left(n,s){var t4=(n<<s)|(n>>>(32-s));return t4;};function lsb_hex(val){var str='';var i;var vh;var vl;for(i=0;i<=6;i+=2){vh=(val>>>(i*4+4))&0x0f;vl=(val>>>(i*4))&0x0f;str+=vh.toString(16)+vl.toString(16);}
return str;};function cvt_hex(val){var str='';var i;var v;for(i=7;i>=0;i--){v=(val>>>(i*4))&0x0f;str+=v.toString(16);}
return str;};function Utf8Encode(string){string=string.replace(/\r\n/g,'\n');var utftext='';for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;};var blockstart;var i,j;var W=new Array(80);var H0=0x67452301;var H1=0xEFCDAB89;var H2=0x98BADCFE;var H3=0x10325476;var H4=0xC3D2E1F0;var A,B,C,D,E;var temp;msg=Utf8Encode(msg);var msg_len=msg.length;var word_array=new Array();for(i=0;i<msg_len-3;i+=4){j=msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3);word_array.push(j);}
switch(msg_len % 4){case 0:i=0x080000000;break;case 1:i=msg.charCodeAt(msg_len-1)<<24|0x0800000;break;case 2:i=msg.charCodeAt(msg_len-2)<<24|msg.charCodeAt(msg_len-1)<<16|0x08000;break;case 3:i=msg.charCodeAt(msg_len-3)<<24|msg.charCodeAt(msg_len-2)<<16|msg.charCodeAt(msg_len-1)<<8|0x80;break;}
word_array.push(i);while((word_array.length % 16)!=14)word_array.push(0);word_array.push(msg_len>>>29);word_array.push((msg_len<<3)&0x0ffffffff);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++)W[i]=word_array[blockstart+i];for(i=16;i<=79;i++)W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=(rotate_left(A,5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=20;i<=39;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=40;i<=59;i++){temp=(rotate_left(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=60;i<=79;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
H0=(H0+A)&0x0ffffffff;H1=(H1+B)&0x0ffffffff;H2=(H2+C)&0x0ffffffff;H3=(H3+D)&0x0ffffffff;H4=(H4+E)&0x0ffffffff;}
var temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);return temp.toLowerCase();}



