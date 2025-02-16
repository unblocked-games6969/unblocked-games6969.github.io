$gameDir = ".\game"
$adTemplate = @"
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
"@

Get-ChildItem $gameDir -Filter "*.html" | ForEach-Object {
	$content = Get-Content $_.FullName -Raw
	
	# Extract the iframe
	if ($content -match '<iframe.*?</iframe>') {
		$iframe = $matches[0]
		
		# Create new content with ads
		$newGameSection = $adTemplate -replace '{GAME_IFRAME}', $iframe
		
		# Replace the existing game container with new content
		$newContent = $content -replace '<div class="container-fluid mt-4 p-0">.*?</div>\s*<div class="row my-3">', "<div class=`"container-fluid mt-4 p-0`">$newGameSection`n    <div class=`"row my-3`">"
		
		# Save the file
		$newContent | Set-Content $_.FullName -NoNewline
	}
}