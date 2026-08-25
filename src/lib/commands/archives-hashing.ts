import type { CommandKB } from './types';

export const archivesHashing: CommandKB = {
  tar: {
    desc: {
      en: "Packs multiple files and folders into a single archive file (a .tar, short for tape archive, a name left over from when the format's main use was writing backups to magnetic tape), optionally compressing the result at the same time. Unlike zip, tar itself only concatenates files together, it doesn't compress; compression is bolted on separately via a flag like -z for gzip or -j for bzip2, which is why archives are commonly named .tar.gz. Its combination of flags is notoriously hard to remember, which is why 'tar -xzvf file.tar.gz' (extract, gzip, verbose, file) is one of the most frequently searched command incantations on the internet.",
      pt: 'Empacota vários arquivos e pastas em um único arquivo de arquivo (um .tar, de tape archive, um nome que sobrou de quando o uso principal do formato era escrever backups em fita magnética), opcionalmente compactando o resultado ao mesmo tempo. Diferente do zip, o tar sozinho só concatena arquivos, ele não compacta; a compactação é ligada separadamente por uma flag como -z para gzip ou -j para bzip2, motivo pelo qual arquivos costumam se chamar .tar.gz. Sua combinação de flags é notoriamente difícil de lembrar, e é por isso que "tar -xzvf arquivo.tar.gz" (extrair, gzip, verboso, arquivo) é uma das invocações de comando mais buscadas na internet.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Creates a new tar archive.',
        pt: 'Cria um novo arquivo tar.',
      },
      '-x': {
        en: 'Extracts the contents of a tar archive.',
        pt: 'Extrai o conteúdo de um arquivo tar.',
      },
      '-v': {
        en: 'Shows each processed file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo processado (modo verboso).',
      },
      '-f': {
        en: 'Specifies the name of the tar file to create or read.',
        pt: 'Especifica o nome do arquivo tar a ser criado ou lido.',
      },
      '-z': {
        en: 'Compresses or decompresses using gzip (.tar.gz files).',
        pt: 'Compacta ou descompacta usando gzip (arquivos .tar.gz).',
      },
      '-t': {
        en: 'Lists the contents of a tar archive without extracting it.',
        pt: 'Lista o conteúdo de um arquivo tar sem extrair.',
      },
    },
    valueFlags: {
      '-f': 'generic',
    },
    argHint: {
      en: 'A specific file inside the archive to add or extract, when not adding/extracting everything.',
      pt: 'Um arquivo específico dentro do pacote para adicionar ou extrair, quando não se está adicionando/extraindo tudo.',
    },
    commonMistake: {
      en: "Extracting an archive without first checking what's inside it (tar -tvf first) can scatter dozens of files across the current directory if the archive wasn't created with everything nested inside one top-level folder, always list before extracting into a shared or important location. Forgetting -z on a .tar.gz (or -j on a .tar.bz2) also produces a confusing 'this does not look like a tar archive' error, since plain tar cannot read compressed data on its own.",
      pt: 'Extrair um arquivo sem antes checar o que tem dentro (tar -tvf primeiro) pode espalhar dezenas de arquivos pelo diretório atual se o pacote não tiver sido criado com tudo dentro de uma única pasta de topo, sempre liste antes de extrair em um local compartilhado ou importante. Esquecer o -z em um .tar.gz (ou o -j em um .tar.bz2) também produz um erro confuso de "isso não parece um arquivo tar", já que o tar puro não consegue ler dados compactados sozinho.',
    },
  },

  unzip: {
    desc: {
      en: "Extracts the contents of a .zip archive, the compression format most associated with Windows and cross-platform file sharing rather than Unix systems (which historically favor tar plus gzip instead). It is worth checking for on a fresh Linux install since, unlike tar and gzip, it often isn't installed by default; downloaded assets, plugin bundles, and files shared from Windows or macOS frequently arrive as .zip, making unzip a common first apt install on a new server.",
      pt: 'Extrai o conteúdo de um arquivo .zip, o formato de compactação mais associado ao Windows e ao compartilhamento de arquivos entre plataformas, e não tanto a sistemas Unix (que historicamente preferem tar combinado com gzip). Vale checar se está instalado logo em uma instalação nova de Linux, já que, diferente do tar e do gzip, muitas vezes não vem por padrão; recursos baixados, pacotes de plugins e arquivos compartilhados do Windows ou macOS frequentemente chegam como .zip, o que faz do unzip um dos primeiros apt install comuns em um servidor novo.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Lists the contents of the archive without extracting.',
        pt: 'Lista o conteúdo do arquivo sem extrair.',
      },
      '-o': {
        en: 'Overwrites existing files without asking for confirmation.',
        pt: 'Sobrescreve arquivos existentes sem pedir confirmação.',
      },
      '-d': {
        en: 'Extracts into a specific destination folder.',
        pt: 'Extrai para uma pasta de destino específica.',
      },
    },
    valueFlags: {
      '-d': 'generic',
    },
    argHint: {
      en: 'The .zip file to extract, or a specific file inside it to extract only that one.',
      pt: 'O arquivo .zip a extrair, ou um arquivo específico dentro dele para extrair só esse.',
    },
    commonMistake: {
      en: 'Without -o, unzip prompts interactively for each file that already exists at the destination, asking to overwrite, skip, or rename. That prompt is invisible in a non-interactive script or CI job, so the process just hangs waiting for input nobody is there to give, and adding -o (or -n to always skip) is what keeps it running unattended.',
      pt: 'Sem -o, o unzip pergunta interativamente para cada arquivo que já existe no destino, pedindo para sobrescrever, pular ou renomear. Essa pergunta é invisível num script não interativo ou numa tarefa de CI, então o processo simplesmente trava esperando uma entrada que ninguém está ali para dar, e adicionar -o (ou -n para sempre pular) é o que mantém tudo rodando sem supervisão.',
    },
  },

  gzip: {
    desc: {
      en: 'Compresses a single file using the DEFLATE algorithm, replacing the original with a .gz version of the same name by default, which is different from zip: gzip compresses exactly one file at a time and has no built-in concept of an archive containing several files, which is exactly why it is so often paired with tar (tar first bundles many files into one, then gzip compresses that single bundle). It favors speed over maximum compression ratio, which is part of why it remains the default choice for things like compressing log files and HTTP response bodies.',
      pt: 'Compacta um único arquivo usando o algoritmo DEFLATE, substituindo o original por uma versão .gz de mesmo nome por padrão, o que é diferente do zip: o gzip compacta exatamente um arquivo por vez e não tem conceito embutido de um arquivo contendo vários outros dentro, e é exatamente por isso que costuma vir emparelhado com o tar (o tar primeiro empacota vários arquivos em um só, depois o gzip compacta esse pacote único). Ele prioriza velocidade em vez de taxa de compactação máxima, o que é parte do motivo dele continuar sendo a escolha padrão para coisas como compactar arquivos de log e corpos de resposta HTTP.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing (same as running gunzip).',
        pt: 'Descompacta em vez de compactar (o mesmo que rodar gunzip).',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
    },
    argHint: {
      en: 'The file to compress.',
      pt: 'O arquivo a compactar.',
    },
    commonMistake: {
      en: "Pointing gzip at a directory fails with an 'Is a directory' error instead of compressing its contents, since gzip has no concept of bundling multiple files together. tar first, gzip second, or tar czf archive.tar.gz folder in one step, is the fix, not a gzip flag.",
      pt: 'Apontar o gzip para um diretório falha com um erro de "Is a directory" em vez de compactar o conteúdo, já que o gzip não tem nenhum conceito de empacotar vários arquivos juntos. tar primeiro, gzip depois, ou tar czf arquivo.tar.gz pasta em um único passo, é a solução, não uma flag do gzip.',
    },
  },

  gunzip: {
    desc: {
      en: "Decompresses a .gz file, restoring the original and removing the .gz version, the exact inverse of gzip, and in fact implemented as the same program: gunzip is equivalent to running 'gzip -d', just under a friendlier name that makes scripts more readable about their intent.",
      pt: 'Descompacta um arquivo .gz, restaurando o original e removendo a versão .gz, o inverso exato do gzip, e de fato implementado pelo mesmo programa: gunzip equivale a rodar "gzip -d", só que com um nome mais amigável, que deixa scripts mais legíveis sobre a intenção.',
    },
    subcommands: {},
    flags: {
      '-k': {
        en: 'Keeps the compressed .gz file instead of removing it.',
        pt: 'Mantém o arquivo .gz compactado em vez de removê-lo.',
      },
    },
    argHint: {
      en: 'The .gz file to decompress.',
      pt: 'O arquivo .gz a descompactar.',
    },
  },

  base64: {
    desc: {
      en: 'Encodes binary data into a text-safe ASCII representation, or decodes it back, used whenever binary content, an image, a certificate, a credential, needs to travel through a system that only reliably handles plain text, like an environment variable, a JSON field, or an email attachment from decades ago when this format was first designed for exactly that purpose. It is text encoding, not encryption or compression, decoding a base64 string requires no secret or key at all, and reverses it perfectly back to the original bytes, and it actually makes the data slightly larger, not smaller.',
      pt: 'Codifica dados binários em uma representação ASCII segura para texto, ou decodifica de volta, usado sempre que conteúdo binário, uma imagem, um certificado, uma credencial, precisa passar por um sistema que só lida de forma confiável com texto puro, como uma variável de ambiente, um campo JSON, ou um anexo de email de décadas atrás, quando esse formato foi criado justamente para esse propósito. É codificação de texto, não criptografia nem compactação, decodificar uma string base64 não exige segredo nem chave nenhuma, e reverte perfeitamente de volta aos bytes originais, e na verdade deixa os dados um pouco maiores, não menores.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decodes base64 input back into its original binary form, instead of encoding.',
        pt: 'Decodifica a entrada base64 de volta à sua forma binária original, em vez de codificar.',
      },
    },
    commonMistake: {
      en: 'GNU base64 wraps its output at 76 characters by default, splitting a single value across multiple lines with embedded newlines, which breaks anything expecting a single unbroken token, an environment variable, a URL parameter, a JSON string value. base64 -w 0 turns that wrapping off and is almost always the form actually needed outside of email-style encoding.',
      pt: 'O base64 do GNU quebra a saída a cada 76 caracteres por padrão, dividindo um único valor em várias linhas com quebras embutidas, o que quebra qualquer coisa que espera um token único e contínuo, uma variável de ambiente, um parâmetro de URL, um valor de string JSON. O base64 -w 0 desliga essa quebra e é quase sempre a forma realmente necessária fora da codificação estilo email.',
    },
  },

  md5sum: {
    desc: {
      en: "Computes the MD5 cryptographic hash of a file, a short fixed-length fingerprint that changes completely if even a single byte of the file changes, traditionally used to verify a downloaded file wasn't corrupted or tampered with by comparing its hash against a published value. MD5 itself is now considered cryptographically broken, deliberately crafted collisions (two different files producing the same hash) are practical to generate, so it should never be relied on for security purposes like verifying a file hasn't been maliciously altered; sha256sum is the modern equivalent to reach for whenever the check actually matters.",
      pt: 'Calcula o hash criptográfico MD5 de um arquivo, uma impressão digital curta de tamanho fixo que muda completamente se até um único byte do arquivo mudar, tradicionalmente usado para verificar se um arquivo baixado não foi corrompido ou adulterado, comparando seu hash com um valor publicado. O MD5 em si hoje é considerado criptograficamente quebrado, colisões propositais (dois arquivos diferentes produzindo o mesmo hash) são praticáveis de gerar, então nunca deveria ser usado para fins de segurança, como verificar se um arquivo não foi alterado maliciosamente; o sha256sum é o equivalente moderno a usar sempre que essa checagem realmente importa.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
    commonMistake: {
      en: "md5sum only hashes individual files: pointing it at a directory fails with an 'Is a directory' error instead of producing one combined hash for everything inside. Hashing a whole directory needs another step first, tar it into one file, or hash each file and then hash that combined list, md5sum itself has no notion of a folder's contents.",
      pt: 'O md5sum só calcula hash de arquivos individuais: apontá-lo para um diretório falha com um erro de "Is a directory" em vez de produzir um hash combinado de tudo dentro. Calcular o hash de um diretório inteiro precisa de outro passo antes, empacotar com tar em um único arquivo, ou calcular o hash de cada arquivo e depois o hash dessa lista combinada, o md5sum em si não tem noção do conteúdo de uma pasta.',
    },
  },

  sha256sum: {
    desc: {
      en: "Computes the SHA-256 cryptographic hash of a file, the modern, still-secure successor to the broken MD5, used to verify that a downloaded file (an installer, a Docker image, an operating system ISO) matches exactly what the publisher intended, with no corruption and no tampering. Trustworthy verification depends on getting the expected hash from a source independent of the download itself, typically the project's official website over HTTPS, since a hash published right next to a compromised file would be compromised too.",
      pt: 'Calcula o hash criptográfico SHA-256 de um arquivo, o sucessor moderno e ainda seguro do MD5 quebrado, usado para verificar se um arquivo baixado (um instalador, uma imagem Docker, uma ISO de sistema operacional) corresponde exatamente ao que o autor pretendia, sem corrupção e sem adulteração. Uma verificação confiável depende de conseguir o hash esperado de uma fonte independente do próprio download, tipicamente o site oficial do projeto via HTTPS, já que um hash publicado bem ao lado de um arquivo comprometido estaria comprometido também.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
    commonMistake: {
      en: 'Comparing two 64-character hashes by eye is exactly the kind of task human attention fails at silently, a single transposed digit deep in the middle looks identical at a glance and is easy to wave through as a match. Piping the expected hash into sha256sum -c instead lets the tool do the exact comparison and print a clear OK or FAILED, rather than trusting eyes against two long hex strings.',
      pt: 'Comparar dois hashes de 64 caracteres a olho é exatamente o tipo de tarefa em que a atenção humana falha silenciosamente, um único dígito trocado bem no meio parece idêntico numa olhada rápida e é fácil deixar passar como se batesse. Encanar o hash esperado para o sha256sum -c em vez disso deixa a ferramenta fazer a comparação exata e imprimir um OK ou FAILED claro, em vez de confiar nos olhos contra duas strings hexadecimais longas.',
    },
  },

  zip: {
    desc: {
      en: 'Packs one or more files into a .zip archive, optionally compressing them at the same time, the counterpart to unzip. Unlike tar, zip both bundles and compresses in the same step and format, and it can add files to an existing archive incrementally without rebuilding the whole thing, which is convenient for gradually collecting files but means a .zip can end up with stale duplicate entries if not managed carefully.',
      pt: 'Empacota um ou mais arquivos em um arquivo .zip, opcionalmente compactando-os ao mesmo tempo, o par do unzip. Diferente do tar, o zip empacota e compacta na mesma etapa e formato, e consegue adicionar arquivos a um arquivo existente de forma incremental sem reconstruir tudo, o que é conveniente para coletar arquivos aos poucos mas significa que um .zip pode acabar com entradas duplicadas obsoletas se não for gerenciado com cuidado.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Recursively includes the contents of folders, not just their top-level entry.',
        pt: 'Inclui recursivamente o conteúdo de pastas, não só a entrada de nível superior delas.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
      '-e': {
        en: 'Encrypts the archive with a password, prompted interactively.',
        pt: 'Criptografa o arquivo com uma senha, pedida interativamente.',
      },
    },
    argHint: {
      en: 'The name of the .zip archive to create, followed by the files to add.',
      pt: 'O nome do arquivo .zip a criar, seguido dos arquivos a adicionar.',
    },
    commonMistake: {
      en: 'Re-zipping into an existing archive only adds or updates files, it never removes an entry for a file that no longer exists on disk, so a zip meant to mirror a folder can quietly keep files that were deleted ages ago. zip -d archive.zip file removes one stale entry, but a completely fresh archive, deleting the old .zip first, is the only sure way to drop everything that no longer belongs.',
      pt: 'Rezipar em um arquivo existente só adiciona ou atualiza arquivos, nunca remove uma entrada de um arquivo que não existe mais no disco, então um zip pensado para espelhar uma pasta pode silenciosamente manter arquivos apagados há muito tempo. O zip -d arquivo.zip arquivo remove uma entrada obsoleta específica, mas um arquivo totalmente novo, apagando o .zip antigo primeiro, é a única forma garantida de descartar tudo que não pertence mais.',
    },
  },

  xz: {
    desc: {
      en: 'Compresses a single file using the LZMA2 algorithm, the same family used by 7-Zip, trading significantly more CPU time and memory during compression for a noticeably smaller output than gzip on the same data. That trade-off is exactly why it shows up for distributing large, compress-once-decompress-many artifacts like Linux kernel source tarballs and software release archives, where the extra compression time is paid once but the smaller download is downloaded by everyone.',
      pt: 'Compacta um único arquivo usando o algoritmo LZMA2, a mesma família usada pelo 7-Zip, trocando bem mais tempo de CPU e memória durante a compactação por uma saída visivelmente menor que o gzip nos mesmos dados. Essa troca é exatamente o motivo dele aparecer para distribuir artefatos grandes, compactados uma vez e descompactados muitas, como tarballs de código-fonte do kernel Linux e pacotes de release de software, onde o tempo extra de compactação é pago uma vez só, mas o download menor é baixado por todo mundo.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing.',
        pt: 'Descompacta em vez de compactar.',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest, most memory-hungry) compression level.',
        pt: 'Usa o nível de compactação mais alto (mais lento e mais consumidor de memória).',
      },
    },
    argHint: {
      en: 'The file to compress or decompress.',
      pt: 'O arquivo a compactar ou descompactar.',
    },
  },

  bzip2: {
    desc: {
      en: "Compresses a single file using the Burrows-Wheeler algorithm, generally landing between gzip and xz on the speed-versus-compression-ratio spectrum: noticeably smaller output than gzip, noticeably faster than xz. It shares gzip's limitation of handling exactly one file at a time with no archive concept, which is why tarballs compressed with it are named .tar.bz2, following the same tar-then-compress pattern as .tar.gz.",
      pt: 'Compacta um único arquivo usando o algoritmo Burrows-Wheeler, geralmente ficando entre o gzip e o xz no espectro de velocidade versus taxa de compactação: saída visivelmente menor que o gzip, visivelmente mais rápido que o xz. Compartilha a limitação do gzip de lidar com exatamente um arquivo por vez, sem conceito de arquivo compactado múltiplo, motivo pelo qual tarballs compactados com ele se chamam .tar.bz2, seguindo o mesmo padrão de tar-depois-compactar do .tar.gz.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing (same as running bunzip2).',
        pt: 'Descompacta em vez de compactar (o mesmo que rodar bunzip2).',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
    },
    argHint: {
      en: 'The file to compress or decompress.',
      pt: 'O arquivo a compactar ou descompactar.',
    },
  },

  openssl: {
    desc: {
      en: "A toolkit for cryptographic operations and TLS/SSL, covering a huge range of tasks under one command: generating a private key, creating or inspecting a certificate, hashing data, encrypting a file, or opening a raw connection to a server to inspect its TLS handshake directly ('openssl s_client'). Its subcommands each behave almost like separate programs with their own flags, which is why the same 'openssl' name covers such a wide range of otherwise unrelated-looking invocations.",
      pt: 'Um conjunto de ferramentas para operações criptográficas e TLS/SSL, cobrindo uma gama enorme de tarefas sob um único comando: gerar uma chave privada, criar ou inspecionar um certificado, calcular hash de dados, criptografar um arquivo, ou abrir uma conexão bruta com um servidor para inspecionar seu handshake TLS diretamente ("openssl s_client"). Cada subcomando se comporta quase como um programa separado com suas próprias flags, motivo pelo qual o mesmo nome "openssl" cobre uma gama tão ampla de invocações que parecem, à primeira vista, não relacionadas.',
    },
    subcommands: {
      genrsa: {
        en: 'Generates a new RSA private key.',
        pt: 'Gera uma nova chave privada RSA.',
      },
      req: {
        en: 'Creates or processes a certificate signing request (CSR).',
        pt: 'Cria ou processa uma solicitação de assinatura de certificado (CSR).',
      },
      x509: {
        en: 'Displays or manipulates an X.509 certificate.',
        pt: 'Exibe ou manipula um certificado X.509.',
      },
      s_client: {
        en: 'Opens a raw connection to a remote server and shows its TLS/SSL handshake and certificate details.',
        pt: 'Abre uma conexão bruta com um servidor remoto e mostra o handshake TLS/SSL e os detalhes do certificado dele.',
      },
      enc: {
        en: 'Encrypts or decrypts data using a chosen cipher.',
        pt: 'Criptografa ou descriptografa dados usando uma cifra escolhida.',
      },
    },
    flags: {},
    commonMistake: {
      en: 'Generating a key with openssl req without -nodes produces a private key encrypted with a passphrase, which means every service that loads it, nginx, a mail server, a boot script, stops and waits for someone to type that passphrase before it can start. -nodes skips the encryption entirely, which is what almost every self-signed certificate tutorial actually needs, even though the flag name reads like it does something else.',
      pt: 'Gerar uma chave com openssl req sem -nodes produz uma chave privada criptografada com senha, o que significa que todo serviço que a carrega, nginx, um servidor de e-mail, um script de boot, para e espera alguém digitar essa senha antes de conseguir iniciar. O -nodes pula essa criptografia por completo, que é o que quase todo tutorial de certificado autoassinado realmente precisa, mesmo que o nome da flag pareça indicar outra coisa.',
    },
  },

  gpg: {
    desc: {
      en: "The GNU Privacy Guard, an implementation of the OpenPGP standard for public-key encryption and digital signatures. It is what verifies that a downloaded file's detached .asc signature was really produced by the key it claims, and what many package repositories and Git commit signing rely on under the hood, key management (generating, importing, trusting a key) is usually the part people find least intuitive about it.",
      pt: 'O GNU Privacy Guard, uma implementação do padrão OpenPGP para criptografia de chave pública e assinaturas digitais. É o que verifica se a assinatura .asc destacada de um arquivo baixado foi realmente produzida pela chave que ela alega ser, e o que muitos repositórios de pacote e a assinatura de commit do Git usam por baixo, gerenciamento de chave (gerar, importar, confiar em uma chave) costuma ser a parte que as pessoas acham menos intuitiva.',
    },
    subcommands: {
      '--gen-key': {
        en: 'Generates a new key pair interactively.',
        pt: 'Gera um novo par de chaves interativamente.',
      },
      '--import': {
        en: "Imports someone else's public key from a file, so their signatures can be verified.",
        pt: 'Importa a chave pública de outra pessoa a partir de um arquivo, para que as assinaturas dela possam ser verificadas.',
      },
      '--verify': {
        en: 'Verifies a detached signature against the file it claims to sign.',
        pt: 'Verifica uma assinatura destacada contra o arquivo que ela alega assinar.',
      },
      '--encrypt': {
        en: "Encrypts a file for a specific recipient's public key.",
        pt: 'Criptografa um arquivo para a chave pública de um destinatário específico.',
      },
    },
    flags: {},
    commonMistake: {
      en: "Importing a public key with --import only adds it to the local keyring, it does not mean gpg trusts it yet, and --verify still reports a signature as good from a key nobody has actually confirmed belongs to who it claims. Checking the key's fingerprint against a value obtained through a separate, trusted channel, the project's website, a different device, before trusting it is the step that import alone skips entirely.",
      pt: 'Importar uma chave pública com --import só a adiciona ao chaveiro local, não significa que o gpg já confia nela, e o --verify ainda relata uma assinatura como boa vinda de uma chave que ninguém de fato confirmou pertencer a quem ela alega. Conferir a impressão digital da chave contra um valor obtido por um canal separado e confiável, o site do projeto, outro dispositivo, antes de confiar nela é o passo que o import sozinho pula por completo.',
    },
  },

  sha1sum: {
    desc: {
      en: "Computes the SHA-1 cryptographic hash of a file. Like MD5, SHA-1 is now considered cryptographically broken for security purposes (practical collision attacks have been demonstrated), so it persists mainly for compatibility with older systems and Git's original object-hashing scheme, not as a recommendation; sha256sum is the modern choice whenever the hash actually needs to resist deliberate tampering.",
      pt: 'Calcula o hash criptográfico SHA-1 de um arquivo. Assim como o MD5, o SHA-1 hoje é considerado criptograficamente quebrado para fins de segurança (ataques práticos de colisão já foram demonstrados), então ele persiste principalmente por compatibilidade com sistemas mais antigos e o esquema original de hash de objeto do Git, não como recomendação; o sha256sum é a escolha moderna sempre que o hash realmente precisa resistir a adulteração deliberada.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
  },

  cksum: {
    desc: {
      en: 'Computes a CRC checksum and byte count for a file, a much older and weaker integrity check than md5sum or sha256sum, designed to catch accidental corruption (a bad transfer, a flipped bit) rather than deliberate tampering, which it offers essentially no protection against.',
      pt: 'Calcula um checksum CRC e a contagem de bytes de um arquivo, uma checagem de integridade bem mais antiga e fraca que md5sum ou sha256sum, feita para pegar corrupção acidental (uma transferência ruim, um bit invertido), não adulteração deliberada, contra a qual oferece essencialmente nenhuma proteção.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to checksum.',
      pt: 'O arquivo a calcular o checksum.',
    },
  },

  uuidgen: {
    desc: {
      en: 'Generates a random UUID (universally unique identifier), a 128-bit value formatted as a string of hex digits that is, for all practical purposes, guaranteed unique across every machine that will ever generate one, without any central coordination needed. It shows up constantly as a quick way to mint a unique ID for a database row, a request trace, or a temporary resource name.',
      pt: 'Gera um UUID aleatório (identificador único universal), um valor de 128 bits formatado como uma string de dígitos hexadecimais que é, para todos os efeitos práticos, garantido único em toda máquina que algum dia gerar um, sem coordenação central nenhuma necessária. Aparece constantemente como uma forma rápida de cunhar um ID único para uma linha de banco de dados, um rastro de requisição, ou um nome de recurso temporário.',
    },
    subcommands: {},
    flags: {},
  },
};
