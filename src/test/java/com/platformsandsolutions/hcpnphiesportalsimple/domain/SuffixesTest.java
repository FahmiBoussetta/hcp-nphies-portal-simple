package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.platformsandsolutions.hcpnphiesportalsimple.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SuffixesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Suffixes.class);
        Suffixes suffixes1 = new Suffixes();
        suffixes1.setId(1L);
        Suffixes suffixes2 = new Suffixes();
        suffixes2.setId(suffixes1.getId());
        assertThat(suffixes1).isEqualTo(suffixes2);
        suffixes2.setId(2L);
        assertThat(suffixes1).isNotEqualTo(suffixes2);
        suffixes1.setId(null);
        assertThat(suffixes1).isNotEqualTo(suffixes2);
    }
}
