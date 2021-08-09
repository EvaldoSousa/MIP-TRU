function formatarTelefone(telefone) {
  if (telefone.length < 12) {
    return telefone;
  }
  return telefone
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(/ /g, "");
}

function reverseFormat(telefone) {
  var tels = [];
  var phormat = "";
  for (let i = 0; i < telefone.length; i++) {
    tels[i] = telefone.charAt(i);
  }
  for (let i = 0; i < telefone.length; i++) {
    if (i == 0) {
      phormat += "(" + tels[i];
    } else if (i == 1) {
      phormat += tels[i] + ") ";
    } else if (i == 2) {
      phormat += tels[i] + " ";
    } else if (i == 6) {
      phormat += tels[i] + "-";
    } else {
      phormat += tels[i];
    }
  }
  return phormat;
}

function removeAcento(text) {
  text = text.toLowerCase();
  text = text.replace(new RegExp("[ÁÀÂÃÄ]", "gi"), "a");
  text = text.replace(new RegExp("[ÉÈÊË]", "gi"), "e");
  text = text.replace(new RegExp("[ÍÌÎÏ]", "gi"), "i");
  text = text.replace(new RegExp("[ÓÒÔÕÖ]", "gi"), "o");
  text = text.replace(new RegExp("[ÚÙÛÜ]", "gi"), "u");
  return text;
}

function buscar(
  municipio_emissor,
  uf_emissor,
  municipio_destinatario,
  uf_destinatario,
  cfop,
  cfop_1d,
  cfop_2d,
  cfop_3d,
  cnae,
  cnae_divisao,
  cnae_grupo,
  cnae_classe_4d,
  cnae_classe_5d,
  scr_2010_trabalho,
  scr_2010_divulga,
  ncm_produto,
  agrupar
) {
  let txt = `SELECT municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario, 
    cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d, cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
    cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, scr_2010_trabalho, 
    scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc, ncm_produto, total_bruto_produtos FROM entradas`;


  if (agrupar == "cnae") {
    if (cnae) {
      txt = `SELECT cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, 
            SUM(total_bruto_produtos) FROM entradas WHERE cnae=\'${cnae}\' group by cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc`;
    } else {
      txt = `SELECT cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc,  SUM(total_bruto_produtos) 
            FROM entradas group by cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc order by cnae asc`;
    }
    return txt;
  }

  if (agrupar == "emissor") {
    if (municipio_emissor) {
      txt = `SELECT municipio_emissor, uf_emissor,
        SUM(total_bruto_produtos) FROM entradas
        WHERE municipio_emissor ilike \'${municipio_emissor}%\'
       group by municipio_emissor, uf_emissor`;
    } else {
      txt = `SELECT municipio_emissor, uf_emissor,
            SUM(total_bruto_produtos) FROM entradas
           group by municipio_emissor, uf_emissor
          order by municipio_emissor asc`;
    }
    return txt;
  }

  if (agrupar == "destinatario") {
    if (municipio_destinatario) {
      txt = `SELECT municipio_destinatario, uf_destinatario,
        SUM(total_bruto_produtos) FROM entradas
        WHERE municipio_destinatario in (${municipio_destinatario.join(', ')})
       group by municipio_destinatario, uf_destinatario`;

    } else {
      txt = `SELECT municipio_destinatario, uf_destinatario,
            SUM(total_bruto_produtos) FROM entradas
           group by municipio_destinatario, uf_destinatario
          order by municipio_destinatario asc`;
    }
    return txt;
  }

  if (agrupar == "cfop") {
    if (cfop) {
      txt = `SELECT cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d,
        SUM(total_bruto_produtos) FROM entradas
        WHERE cfop=\'${cfop}\'
       group by cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d`;
    } else {
      txt = `SELECT cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d,
            SUM(total_bruto_produtos) FROM entradas
           group by cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d
          order by cfop asc`;
    }
    return txt;
  }

  if (agrupar == "scr") {
    if (scr_2010_trabalho) {
      txt = `SELECT scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc,
            SUM(total_bruto_produtos) FROM entradas
            WHERE scr_2010_trabalho=\'${scr_2010_trabalho}\'
            group by scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc`;
    } else {
      txt = `SELECT scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc,
            SUM(total_bruto_produtos) FROM entradas
            group by scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc
            order by scr_2010_trabalho asc`;
    }
    return txt;
  }

  if (municipio_emissor || uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d ||
      scr_2010_trabalho ||
      scr_2010_divulga ||
      ncm_produto) {
    txt += " WHERE ";
  }

  if (municipio_emissor) {
    txt += " municipio_emissor ilike '" + municipio_emissor + "%' ";
  }

  if (uf_emissor) {
    if (municipio_emissor) {
      txt += "and";
    }
    txt += " uf_emissor ilike '" + uf_emissor + "%' ";
  }

  if (municipio_destinatario) {
    if (municipio_emissor || uf_emissor) {
      txt += "and";
    }
    txt += " municipio_destinatario in (" + municipio_destinatario + ") ";
  }
  if (uf_destinatario) {
    if (municipio_emissor || uf_emissor || municipio_destinatario) {
      txt += "and";
    }
    txt += " uf_destinatario ilike '" + uf_destinatario + "%' ";
  }
  if (cfop) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario
    ) {
      txt += "and";
    }
    txt += " cfop ilike '" + cfop + "%' ";
  }
  if (cfop_1d) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop
    ) {
      txt += "and";
    }
    txt += " cfop_1d ilike '" + cfop_1d + "%' ";
  }
  if (cfop_2d) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d
    ) {
      txt += "and";
    }
    txt += " cfop_2d ilike '" + cfop_2d + "%' ";
  }
  if (cfop_3d) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d
    ) {
      txt += "and";
    }
    txt += " cfop_3d ilike '" + cfop_3d + "%' ";
  }
  if (cnae) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d
    ) {
      txt += "and";
    }
    txt += " cnae ilike '" + cnae + "%' ";
  }
  if (cnae_divisao) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae
    ) {
      txt += "and";
    }
    txt += " cnae_divisao ilike '" + cnae_divisao + "%' ";
  }
  if (cnae_grupo) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao
    ) {
      txt += "and";
    }
    txt += " cnae_grupo ilike '" + cnae_grupo + "%' ";
  }
  if (cnae_classe_4d) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo
    ) {
      txt += "and";
    }
    txt += " cnae_classe_4d ilike '" + cnae_classe_4d + "%' ";
  }
  if (cnae_classe_5d) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d
    ) {
      txt += "and";
    }
    txt += " cnae_classe_5d ilike '" + cnae_classe_5d + "%' ";
  }
  if (scr_2010_trabalho) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d
    ) {
      txt += "and";
    }
    txt += " scr_2010_trabalho ilike '" + scr_2010_trabalho + "%' ";
  }
  if (scr_2010_divulga) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d ||
      scr_2010_trabalho
    ) {
      txt += "and";
    }
    txt += " scr_2010_divulga ilike '" + scr_2010_divulga + "%' ";
  }
  if (ncm_produto) {
    if (
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d ||
      scr_2010_trabalho ||
      scr_2010_divulga
    ) {
      txt += "and";
    }
    txt += " ncm_produto='" + ncm_produto + "' ";
  }

  return txt;
}

function buscarSelect(entrada) {
  let txt = "SELECT DISTINCT ";

  if (entrada == "municipio_emissor") {
    txt += "municipio_emissor FROM entradas order by municipio_emissor asc";
  }
  if (entrada == "uf_emissor") {
    txt += "uf_emissor FROM entradas order by uf_emissor asc";
  }
  if (entrada == "municipio_destinatario") {
    txt +=
      "municipio_destinatario FROM entradas order by municipio_destinatario asc";
  }
  if (entrada == "uf_destinatario") {
    txt += "uf_destinatario FROM entradas order by uf_destinatario asc";
  }
  if (entrada == "cfop") {
    txt += "cfop FROM entradas order by cfop asc";
  }
  if (entrada == "cfop_1d") {
    txt += "cfop_1d FROM entradas order by cfop_1d asc";
  }
  if (entrada == "cfop_2d") {
    txt += "cfop_2d FROM entradas order by cfop_2d asc";
  }
  if (entrada == "cfop_3d") {
    txt += "cfop_3d FROM entradas order by cfop_3d asc";
  }
  if (entrada == "cnae") {
    txt += "cnae FROM entradas order by cnae asc";
  }
  if (entrada == "cnae_divisao") {
    txt += "cnae_divisao FROM entradas order by cnae_divisao asc";
  }
  if (entrada == "cnae_grupo") {
    txt += "cnae_grupo FROM entradas order by cnae_grupo asc";
  }
  if (entrada == "cnae_classe_4d") {
    txt += "cnae_classe_4d FROM entradas order by cnae_classe_4d asc";
  }
  if (entrada == "cnae_classe_5d") {
    txt += "cnae_classe_5d FROM entradas order by cnae_classe_5d asc";
  }
  if (entrada == "scr_2010_trabalho") {
    txt += "scr_2010_trabalho FROM entradas order by scr_2010_trabalho asc";
  }
  if (entrada == "scr_2010_divulga") {
    txt += "scr_2010_divulga FROM entradas order by scr_2010_divulga asc";
  }
  if (entrada == "ncm_produto") {
    txt += "ncm_produto FROM entradas order by ncm_produto asc";
  }
  return txt;
}

function aspas(entrada, retorno) {
  if(entrada != null) {
    entrada.map(function(e, i) {
      retorno[i] = `\'${e}\'`;
    });
  } else {
    retorno = entrada;
  }
}

module.exports = {
  formatarTelefone,
  reverseFormat,
  removeAcento,
  buscar,
  buscarSelect,
  aspas
};
