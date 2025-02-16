const fs = require('fs');
const path = require('path');

try {
	const gameDir = path.join(__dirname, 'game');
	console.log('Game directory:', gameDir);

	if (!fs.existsSync(gameDir)) {
		throw new Error(`Game directory not found: ${gameDir}`);
	}

	const adTemplate = `
	<!-- Top Ad Banner -->
	<div class="text-center mb-3">
		<div style="margin: 0 auto; width: 300px; height: 250px;">
			<script type="text/javascript">
				atOptions = {
					'key' : 'f85294125827546374828c9aad51a875',
					'format' : 'iframe',
					'height' : 250,
					'width' : 300,
					'params' : {}
				};
			</script>
			<script type="text/javascript" src="//www.highperformanceformat.com/f85294125827546374828c9aad51a875/invoke.js"></script>
		</div>
	</div>
	
	<div class="row">
		<!-- Left Ad Banner -->
		<div class="col-auto d-none d-lg-block">
			<div style="width: 160px; height: 600px;">
				<script type="text/javascript">
					atOptions = {
						'key' : '6d03329bab4c82ae1e0ac5e62443f013',
						'format' : 'iframe',
						'height' : 600,
						'width' : 160,
						'params' : {}
					};
				</script>
				<script type="text/javascript" src="//www.highperformanceformat.com/6d03329bab4c82ae1e0ac5e62443f013/invoke.js"></script>
			</div>
		</div>
		
		<!-- Game Area -->
		<div class="col text-center p-0 m-0">
			<div id="game">
				<div class="mx-auto" style="width: 900px; height: 675px; overflow: hidden;">
					{GAME_IFRAME}
				</div>
			</div>
		</div>
		
		<!-- Right Ad Banner -->
		<div class="col-auto d-none d-lg-block">
			<div style="width: 160px; height: 600px;">
				<script type="text/javascript">
					atOptions = {
						'key' : '6d03329bab4c82ae1e0ac5e62443f013',
						'format' : 'iframe',
						'height' : 600,
						'width' : 160,
						'params' : {}
					};
				</script>
				<script type="text/javascript" src="//www.highperformanceformat.com/6d03329bab4c82ae1e0ac5e62443f013/invoke.js"></script>
			</div>
		</div>
	</div>
	
	<!-- Bottom Ad Banner -->
	<div class="text-center mt-3">
		<div style="margin: 0 auto; width: 300px; height: 250px;">
			<script type="text/javascript">
				atOptions = {
					'key' : 'f85294125827546374828c9aad51a875',
					'format' : 'iframe',
					'height' : 250,
					'width' : 300,
					'params' : {}
				};
			</script>
			<script type="text/javascript" src="//www.highperformanceformat.com/f85294125827546374828c9aad51a875/invoke.js"></script>
		</div>
	</div>
`;

const files = fs.readdirSync(gameDir);
console.log(`Found ${files.length} files in game directory`);

files.forEach(file => {
	if (file.endsWith('.html')) {
		try {
			const filePath = path.join(gameDir, file);
			console.log(`\nProcessing ${file}...`);
			
			let content = fs.readFileSync(filePath, 'utf8');
			console.log(`Read ${content.length} bytes from ${file}`);
			
			// More robust iframe regex that handles multiline and attributes
			const iframeMatch = content.match(/<iframe[\s\S]*?<\/iframe>/);
			
			if (iframeMatch) {
				const iframe = iframeMatch[0];
				console.log('Found iframe:', iframe.substring(0, 100) + '...');
				
				const newGameSection = adTemplate.replace('{GAME_IFRAME}', iframe);
				
				// More robust container div regex that handles variations in whitespace and attributes
				content = content.replace(
					/<div[^>]*class="[^"]*container-fluid[^"]*mt-4[^"]*p-0[^"]*"[\s\S]*?<div[^>]*class="[^"]*row[^"]*my-3[^"]*">/,
					`<div class="container-fluid mt-4 p-0">${newGameSection}\n    <div class="row my-3">`
				);
				
				fs.writeFileSync(filePath, content, 'utf8');
				console.log(`Successfully updated ${file}`);
			} else {
				console.log(`No iframe found in ${file}`);
			}
		} catch (err) {
			console.error(`Error processing ${file}:`, err);
		}
	}
});

console.log('\nAll files processed.');
console.error('Fatal error:', err);