$content = Get-Content -Raw -Path 'src\lib\mockData.ts'

$youtubeMap = @{
  'spiderman-remastered' = 'q4IrtAX5pRw'
  'god-of-war-ragnarok' = 'hfJ4Km46A-0'
  'elden-ring' = 'E3Huy2cdih0'
  'horizon-forbidden-west' = 'Lq594Xpoa8g'
  'the-last-of-us-part-1' = 'WxjeV10H1F0'
  'cyberpunk-2077' = '8X2kIfS6fb8'
  'gta-6' = 'QdBZY2fkU-0'
  'wolverine' = 'ZdlM-02L8t4'
  'ghost-of-yotei' = '7z7MM6N9g2M'
  'rdr-2' = 'eaW0tYpxyp0'
  'gta-5' = 'QkkoHAzjnUs'
  'ea-fc-24' = 'XhP3Xh4LMA8'
  'helldivers-2' = 'ZUTsoX80FwA'
  'ghost-of-tsushima' = 'MUz539AeC5Y'
  'death-stranding' = 'piIgkj7BgIg'
  'days-gone' = 'VDqBQhGJaX0'
  'returnal' = 'Jv4DjVcGNOo'
  'ratchet-clank' = '9p_gg9UW9k4'
  'uncharted' = '4wJzI54oO5E'
}

foreach ($key in $youtubeMap.Keys) {
    $ytId = $youtubeMap[$key]
    $imgUrl = "https://img.youtube.com/vi/$ytId/maxresdefault.jpg"
    $ytUrl = "https://www.youtube.com/watch?v=$ytId"
    
    $regex = '(?s)("' + $key + '": \{.*?heroImage: ")[^"]+(".*?coverImage: ")[^"]+(".*?media: \{\s*trailerBg: ")[^"]+(".*?gameplay: ")[^"]+(")'
    $replacement = "${1}${2}${3}${4}${5}
      trailerUrl: """
    $content = $content -replace $regex, $replacement
}

Set-Content -Path 'src\lib\mockData.ts' -Value $content
