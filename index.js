const fs = require('fs-extra');
const path = require('path');
const walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

if(!fs.existsSync("logs")){
	fs.mkdirSync('logs');
	console.log('Я не нашёл папку "logs," поэтому я её создал за тебя.\nТебе только осталось закинуть логи в папку "logs" и запустить скрипт по новой.');
	return
}
console.log('Собираю пути, не завершайте скрипт пока он сам этого не захочет.\nДа, теперь не вы будете хотеть, а скрипт :3');

walk('./logs', function(err, results) {
  if (err) throw err;
  console.log(results)
  for ( strPath of results) {
	  try{
	  if( strPath.endsWith('.txt')){
  let data = fs.readFileSync(strPath);
let password2 = [...(data.toString()
				.matchAll(/Server: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([0-9]{1,5})\r\nUsername: (([^\n]*))\r\nPassword: (([^\n]*))/g))]; 
					
				  password2.forEach(x => {
					    console.log(x[0].replace(/\r\n/g, "|"));
						if(x[3].includes('root')){
						fs.appendFileSync('server_root.txt', x[0].replace(/\r\n/g, "|") + "\n");
						} else {
					    fs.appendFileSync('server.txt', x[0].replace(/\r\n/g, "|") + "\n");
						}
					}); 

 }
	  } catch(err) {
		  console.log(err)
	  }
  }
});