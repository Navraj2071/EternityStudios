

const ipfsPin =async (im, account) => {  
  const myURL = 'http://localhost:8000/nft/fileupload';
  const formdata = new FormData();
  formdata.append('nft_file', im)
  formdata.append('account', account)

  const response = await fetch(myURL, {
    method: 'POST',
    body: formdata
  })
  const data = await response.json();
  console.log(data)
  return data
}


export default ipfsPin;
