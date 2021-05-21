package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.platformsandsolutions.hcpnphiesportalsimple.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PrefixesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prefixes.class);
        Prefixes prefixes1 = new Prefixes();
        prefixes1.setId(1L);
        Prefixes prefixes2 = new Prefixes();
        prefixes2.setId(prefixes1.getId());
        assertThat(prefixes1).isEqualTo(prefixes2);
        prefixes2.setId(2L);
        assertThat(prefixes1).isNotEqualTo(prefixes2);
        prefixes1.setId(null);
        assertThat(prefixes1).isNotEqualTo(prefixes2);
    }
}
