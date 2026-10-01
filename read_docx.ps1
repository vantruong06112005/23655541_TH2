Add-Type -AssemblyName System.IO.Compression.FileSystem
$docxPath = "e:\KTXGo_23655541\THUC-HANH-2_FINAL.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Extract all text from w:t elements
[regex]::Matches($content, '<w:t[^>]*>(.*?)</w:t>') | ForEach-Object { $_.Groups[1].Value } | Out-File -FilePath "e:\KTXGo_23655541\docx_text.txt" -Encoding utf8

# Also extract tables or paragraphs properly to preserve structure
[xml]$xml = $content
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $xml.SelectNodes("//w:p", $ns)
$lines = @()
foreach ($p in $paragraphs) {
    $texts = $p.SelectNodes(".//w:t", $ns)
    $line = ""
    foreach ($t in $texts) {
        $line += $t.InnerText
    }
    if ($line.Trim() -ne "") {
        $lines += $line
    }
}
$lines | Out-File -FilePath "e:\KTXGo_23655541\docx_paragraphs.txt" -Encoding utf8
Write-Output "Extracted $($lines.Count) paragraphs."
