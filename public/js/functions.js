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
  ano,
  municipio_emissor_codigo,
  municipio_emissor,
  uf_emissor,
  municipio_destinatario_codigo,
  municipio_destinatario,
  uf_destinatario,
  cfop,
  cfop_1d,
  cfop_2d,
  cfop_3d,
  ncm_produto,
  cnae,
  cnae_divisao,
  cnae_grupo,
  cnae_classe_4d,
  cnae_classe_5d,
  scr_2010_trabalho,
  scr_2010_divulga,
  agrupar
) {
  let txt = `SELECT ano, municipio_emissor_codigo, municipio_emissor, uf_emissor, municipio_destinatario_codigo, municipio_destinatario, uf_destinatario, 
    cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d, ncm_produto, cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
    cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, scr_2010_trabalho, 
    scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc, total_bruto_produtos FROM entradas2`;

  if (agrupar == "cnae") {
    if (cnae) {
      if (Array.isArray(cnae)) {
        txt = `SELECT cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
              cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, 
              SUM(total_bruto_produtos) FROM entradas2 WHERE cnae in (${cnae.join(
                ", "
              )}) group by cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
              cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc`;
      } else {
        txt = `SELECT cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
              cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, 
              SUM(total_bruto_produtos) FROM entradas2 WHERE cnae in (\'${cnae}\') group by cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
              cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc`;
      }
    } else {
      txt = `SELECT cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc,  SUM(total_bruto_produtos) 
            FROM entradas2 group by cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
            cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc order by cnae asc`;
    }
    return txt;
  }

  if (agrupar == "emissor") {
    if (municipio_emissor) {
      if (Array.isArray(municipio_emissor)) {
        txt = `SELECT municipio_emissor, uf_emissor,
          SUM(total_bruto_produtos) FROM entradas2
          WHERE municipio_emissor in (${municipio_emissor.join(", ")})
         group by municipio_emissor, uf_emissor`;
      } else {
        txt = `SELECT municipio_emissor, uf_emissor,
          SUM(total_bruto_produtos) FROM entradas2
          WHERE municipio_emissor in (\'${municipio_emissor}\')
         group by municipio_emissor, uf_emissor`;
      }
    } else {
      txt = `SELECT municipio_emissor, uf_emissor,
            SUM(total_bruto_produtos) FROM entradas2
           group by municipio_emissor, uf_emissor
          order by municipio_emissor asc`;
    }
    // console.log(txt);
    return txt;
  }

  if (agrupar == "destinatario") {
    if (municipio_destinatario) {
      if (Array.isArray(municipio_destinatario)) {
        txt = `SELECT municipio_destinatario, uf_destinatario,
          SUM(total_bruto_produtos) FROM entradas2
          WHERE municipio_destinatario in (${municipio_destinatario.join(", ")})
         group by municipio_destinatario, uf_destinatario`;
      } else {
        txt = `SELECT municipio_destinatario, uf_destinatario,
          SUM(total_bruto_produtos) FROM entradas2
          WHERE municipio_destinatario in (\'${municipio_destinatario}\')
         group by municipio_destinatario, uf_destinatario`;
      }
    } else {
      txt = `SELECT municipio_destinatario, uf_destinatario,
            SUM(total_bruto_produtos) FROM entradas2
           group by municipio_destinatario, uf_destinatario
          order by municipio_destinatario asc`;
    }
    return txt;
  }

  if (agrupar == "cfop") {
    if (cfop) {
      if (Array.isArray(cfop)) {
        txt = `SELECT cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d,
          SUM(total_bruto_produtos) FROM entradas2
          WHERE cfop in (${cfop.join(", ")})
         group by cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d`;
      } else {
        txt = `SELECT cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d,
            SUM(total_bruto_produtos) FROM entradas2
            WHERE cfop in (\'${cfop}\')
           group by cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d`;
      }
    } else {
      txt = `SELECT cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d,
            SUM(total_bruto_produtos) FROM entradas2
           group by cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d
          order by cfop asc`;
    }
    return txt;
  }

  if (agrupar == "scr") {
    if (scr_2010_trabalho) {
      if (Array.isArray(scr_2010_trabalho)) {
        txt = `SELECT scr_2010_trabalho, 
              scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc,
              SUM(total_bruto_produtos) FROM entradas2
              WHERE scr_2010_trabalho in (${scr_2010_trabalho.join(", ")})
              group by scr_2010_trabalho, 
              scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc`;
      } else {
        txt = `SELECT scr_2010_trabalho, 
              scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc,
              SUM(total_bruto_produtos) FROM entradas2
              WHERE scr_2010_trabalho in (${scr_2010_trabalho.join(", ")})
              group by scr_2010_trabalho, 
              scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc`;
      }
    } else {
      txt = `SELECT scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc,
            SUM(total_bruto_produtos) FROM entradas2
            group by scr_2010_trabalho, 
            scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc
            order by scr_2010_trabalho asc`;
    }
    return txt;
  }

  if (
    ano ||
    municipio_emissor_codigo ||
    municipio_emissor ||
    uf_emissor ||
    municipio_destinatario_codigo ||
    municipio_destinatario ||
    uf_destinatario ||
    cfop ||
    cfop_1d ||
    cfop_2d ||
    cfop_3d ||
    ncm_produto ||
    cnae ||
    cnae_divisao ||
    cnae_grupo ||
    cnae_classe_4d ||
    cnae_classe_5d ||
    scr_2010_trabalho ||
    scr_2010_divulga
  ) {
    txt += " WHERE ";
  }

  if (ano) {
    if (Array.isArray(ano)) {
      txt += " ano in (" + ano + ") ";
    } else {
      txt += " ano in ('" + ano + "') ";
    }
  }

  if (municipio_emissor_codigo) {
    if (ano) {
      txt += "and";
    }
    if (Array.isArray(municipio_emissor_codigo)) {
      txt += " municipio_emissor_codigo in (" + municipio_emissor_codigo + ") ";
    } else {
      txt +=
        " municipio_emissor_codigo in ('" + municipio_emissor_codigo + "') ";
    }
  }

  if (municipio_emissor) {
    if (ano || municipio_emissor_codigo) {
      txt += "and";
    }
    if (Array.isArray(municipio_emissor)) {
      txt += " municipio_emissor in (" + municipio_emissor + ") ";
    } else {
      txt += " municipio_emissor in ('" + municipio_emissor + "') ";
    }
  }

  if (uf_emissor) {
    if (ano || municipio_emissor_codigo || municipio_emissor) {
      txt += "and";
    }
    if (Array.isArray(uf_emissor)) {
      txt += " uf_emissor in (" + uf_emissor + ") ";
    } else {
      txt += " uf_emissor in ('" + uf_emissor + "') ";
    }
  }

  if (municipio_destinatario_codigo) {
    if (ano || municipio_emissor_codigo || municipio_emissor || uf_emissor) {
      txt += "and";
    }
    if (Array.isArray(municipio_destinatario_codigo)) {
      txt +=
        " municipio_destinatario_codigo in (" +
        municipio_destinatario_codigo +
        ") ";
    } else {
      txt +=
        " municipio_destinatario_codigo in ('" +
        municipio_destinatario_codigo +
        "') ";
    }
  }

  if (municipio_destinatario) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo
    ) {
      txt += "and";
    }
    if (Array.isArray(municipio_destinatario)) {
      txt += " municipio_destinatario in (" + municipio_destinatario + ") ";
    } else {
      txt += " municipio_destinatario in ('" + municipio_destinatario + "') ";
    }
  }

  if (uf_destinatario) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario
    ) {
      txt += "and";
    }
    if (Array.isArray(uf_destinatario)) {
      txt += " uf_destinatario in (" + uf_destinatario + ") ";
    } else {
      txt += " uf_destinatario in ('" + uf_destinatario + "') ";
    }
  }
  if (cfop) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cfop in (" + cfop + ") ";
    } else {
      txt += " cfop in ('" + cfop + "') ";
    }
  }
  if (cfop_1d) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cfop_1d in (" + cfop_1d + ") ";
    } else {
      txt += " cfop_1d in ('" + cfop_1d + "') ";
    }
  }
  if (cfop_2d) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cfop_2d in (" + cfop_2d + ") ";
    } else {
      txt += " cfop_2d in ('" + cfop_2d + "') ";
    }
  }
  if (cfop_3d) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cfop_3d in (" + cfop_3d + ") ";
    } else {
      txt += " cfop_3d in ('" + cfop_3d + "') ";
    }
  }
  if (ncm_produto) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " ncm_produto in (" + ncm_produto + ") ";
    } else {
      txt += " ncm_produto in ('" + ncm_produto + "') ";
    }
  }
  if (cnae) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cnae in (" + cnae + ") ";
    } else {
      txt += " cnae in ('" + cnae + "') ";
    }
  }
  if (cnae_divisao) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cnae_divisao in (" + cnae_divisao + ") ";
    } else {
      txt += " cnae_divisao in ('" + cnae_divisao + "') ";
    }
  }
  if (cnae_grupo) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae ||
      cnae_divisao
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cnae_grupo in (" + cnae_grupo + ") ";
    } else {
      txt += " cnae_grupo in ('" + cnae_grupo + "') ";
    }
  }
  if (cnae_classe_4d) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae ||
      cnae_divisao ||
      cnae_grupo
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cnae_classe_4d in (" + cnae_classe_4d + ") ";
    } else {
      txt += " cnae_classe_4d in ('" + cnae_classe_4d + "') ";
    }
  }
  if (cnae_classe_5d) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " cnae_classe_5d in (" + cnae_classe_5d + ") ";
    } else {
      txt += " cnae_classe_5d in ('" + cnae_classe_5d + "') ";
    }
  }
  if (scr_2010_trabalho) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d
    ) {
      txt += "and";
    }
    if (Array.isArray(cfop)) {
      txt += " scr_2010_trabalho in (" + scr_2010_trabalho + ") ";
    } else {
      txt += " scr_2010_trabalho in ('" + scr_2010_trabalho + "') ";
    }
  }
  if (scr_2010_divulga) {
    if (
      ano ||
      municipio_emissor_codigo ||
      municipio_emissor ||
      uf_emissor ||
      municipio_destinatario_codigo ||
      municipio_destinatario ||
      uf_destinatario ||
      cfop ||
      cfop_1d ||
      cfop_2d ||
      cfop_3d ||
      ncm_produto ||
      cnae ||
      cnae_divisao ||
      cnae_grupo ||
      cnae_classe_4d ||
      cnae_classe_5d ||
      scr_2010_trabalho
    ) {
      txt += "and";
    }
    if (Array.isArray(scr_2010_divulga)) {
      txt += " scr_2010_divulga in (" + scr_2010_divulga + ") ";
    } else {
      txt += " scr_2010_divulga in ('" + scr_2010_divulga + "') ";
    }
  }

  // console.log(txt + "\n");
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
  if (Array.isArray(entrada)) {
    entrada.map(function (e, i) {
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
  aspas,
};
