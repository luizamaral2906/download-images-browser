let list = [];
let ID_IMG = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadImage(imageSrc) 
{
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = ID_IMG;
  ID_IMG++;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function download() 
{
	let list = document.getElementsByTagName("img"); 
	console.log(list);
	try {
		for (let i = 0; i < list.length; i++) 
		{
			console.log('tentando:: ' + i);
						
			try
			{
				let favicon = list[i].src.substr(35, 7);
				if(favicon == 'favicon') continue;
				let tp = list[i].src.substr(8, 9);
				if(tp != 'encrypted') continue;					
				
				console.log('Baixando::', list[i].src);
				await downloadImage(list[i].src);
				await sleep(i * 100);
			}
			catch (e) {
				console.log(e);
				continue;
			}
		}
	}
	catch (e) {
		console.log(e);
	}
}

download();




