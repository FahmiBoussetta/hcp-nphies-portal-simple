package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.platformsandsolutions.hcpnphiesportalsimple.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TextsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Texts.class);
        Texts texts1 = new Texts();
        texts1.setId(1L);
        Texts texts2 = new Texts();
        texts2.setId(texts1.getId());
        assertThat(texts1).isEqualTo(texts2);
        texts2.setId(2L);
        assertThat(texts1).isNotEqualTo(texts2);
        texts1.setId(null);
        assertThat(texts1).isNotEqualTo(texts2);
    }
}
